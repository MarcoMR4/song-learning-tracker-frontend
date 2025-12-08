<template>
  <div class="q-pa-sm">
    <q-form ref="formRef" @submit.prevent="onSubmit">
      <template v-for="field in fields" :key="field.name">
        <component
          :is="resolveComponent(field)"
          v-bind="field.props"
          v-model="formData[field.name]"
          :ref="setFieldRef(field.name)"
          :rules="getRules(field)"
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
import { QInput, QSelect, QField } from 'quasar';
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
}>();

const emit = defineEmits(['submit', 'update:modelValue']);
const { showError } = useQuasarUi();

const formData = reactive({ ...(props.modelValue || {}) });
const formRef = ref();
const fieldRefs = reactive<Record<string, any>>({});

watch(
  () => props.modelValue,
  (val) => {
    if (val) Object.assign(formData, val);
  }
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

function getRules(field: FieldDef) {
  // Si el usuario pasa rules en props, los respeta, si no, aplica reglas por defecto
  const userRules = field.props?.rules;
  if (userRules) return userRules;
  const rules = [];
  // Regla: requerido
  rules.push((val: any) => {
    if (val === undefined || val === null || val === '') return 'This field is required';
    return true;
  });
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