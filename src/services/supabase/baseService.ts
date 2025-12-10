

export const fetchAll = async (table: string) => {
  const supabase = useSupabaseClient();
  const { data, error } = await supabase.from(table).select('*')

  if (error) throw error
  return data
}

export const fetchById = async (table: string, id: number | string) => {
  const supabase = useSupabaseClient();
  const { data, error } = await supabase.from(table)
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const createItem = async (table: string, payload: any) => {
  const supabase = useSupabaseClient();
  const { data, error } = await supabase.from(table)
    .insert(payload)
    .select()

  if (error) throw error
  return data[0]
}

export const updateItem = async (table: string, id: number | string, payload: any) => {
  const supabase = useSupabaseClient();
  const { data, error } = await supabase.from(table)
    .update(payload)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export const deleteItem = async (table: string, id: number | string) => {
  const supabase = useSupabaseClient();
  const { error } = await supabase.from(table)
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}
