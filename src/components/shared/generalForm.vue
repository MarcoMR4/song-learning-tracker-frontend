<template>
  <div class="q-pa-sm">
    <q-form ref="formRef" @submit.prevent="onSubmit">
      <template v-for="field in fields" :key="field.name">
        <component
          :is="resolveComponent(field)"
          v-bind="getBoundProps(field)"
          v-model="formData[field.name]"
          :ref="setFieldRef(field.name)"
          :rules="getRules(field)"
          :options="field.options"
        >
          <template
            v-if="field.options && (field.type === 'select' || field.type === 'QSelect')"
            #option="scope"
          >
            <q-item v-bind="scope.itemProps">
              <q-item-section>{{ scope.opt.label || scope.opt }}</q-item-section>
            </q-item>
          </template>
        </component>
      </template>
    </q-form>
  </div>
</template>

<script setup lang="ts">

import { 
  QInput, 
  QSelect, 
  QField 
} from 'quasar';
import { useQuasarUi } from '~/composables/useQuasarUi';

interface FieldDef {
  name: string;
  type: string; // 'input', 'select', 'QInput', 'QSelect', etc.
  props?: Record<string, any>;
  options?: any[]; // Para selects
  required?: boolean;
}

const props = defineProps<{
  fields: FieldDef[];
  modelValue?: Record<string, any>;
  isViewMode?: boolean;
}>();

const emit = defineEmits(['submit', 'update:modelValue']);
const { showError } = useQuasarUi();

const formData = reactive({ ...(props.modelValue || {}) });
const formRef = ref();
const fieldRefs = reactive<Record<string, any>>({});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      for (const field of props.fields) {
        if (
          (field.type === 'QSelect' || field.type === 'select') &&
          val[field.name] &&
          typeof val[field.name] === 'object' &&
          val[field.name] !== null
        ) {
          // Si el valor es un objeto, toma el id o value
          formData[field.name] = val[field.name].id ?? val[field.name].value ?? val[field.name];
        } else {
          formData[field.name] = val[field.name];
        }
      }
    }
  },
  { immediate: true }
);

function resolveComponent(field: FieldDef) {
  if (field.type === 'input' || field.type === 'QInput') return QInput;
  if (field.type === 'select' || field.type === 'QSelect') return QSelect;
  if (field.type === 'QField') return QField;
  return field.type;
}

function setFieldRef(name: string) {
  return (el: any) => {
    if (el) fieldRefs[name] = el;
  };
}

function getBoundProps(field: FieldDef) {
  const fieldProps = { ...(field.props || {}) };
  const isQSelect = field.type === 'QSelect' || field.type === 'select';
  const isRequired = field.required || field.props?.required;
  if (isRequired && fieldProps.label) {
    fieldProps.label = `${fieldProps.label}*`;
  }
  if (props.isViewMode) {
    fieldProps.readonly = true;
  }
  // Defaults for QSelect fields
  if (isQSelect) {
    if (fieldProps.outlined === undefined) fieldProps.outlined = true;
    if (fieldProps.emitValue === undefined) fieldProps.emitValue = true;
    if (fieldProps.mapOptions === undefined) fieldProps.mapOptions = true;
  }
  return fieldProps;
}

function getRules(field: FieldDef) {
  // Si el usuario pasa rules en props, los respeta, si no, aplica reglas por defecto
  const userRules = field.props?.rules;
  if (userRules) return userRules;
  const rules = [];
  const isRequired = field.required || field.props?.required;
  
  if (isRequired) {
    rules.push((val: any) => {
      if (val === undefined || val === null || val === '') return 'This field is required';
      return true;
    });
  }
  // Regla: si es numérico
  if (field.props?.type === 'number' || field.type === 'number') {
    rules.push((val: any) => {
      if (val === '' || val === undefined || val === null) return true; // Ya lo valida el required
      return !isNaN(Number(val)) || 'This field must be a number';
    });
  }
  return rules;
}

async function validateForm() {
    // Validación global del formulario
    const valid = await formRef.value?.validate?.();
    if (valid) {
        return true;
    }
    // Si falla, validar cada campo individualmente
    await nextTick();
    for (const field of props.fields) {
        const refField = fieldRefs[field.name];
        if (refField && refField.validate) {
            const res = await refField.validate();
            if (res !== true) {
                console.error(`Field required failed: ${field.name}`, res);
            }
        }
    }
    showError('Please fill all the required fields.');
    return false;
}

async function onSubmit() {
    const result = await validateForm();
    if (result) {
        return { valid: true, data: { ...formData } };
    }
    return { valid: false };
}

defineExpose({ onSubmit });

</script>