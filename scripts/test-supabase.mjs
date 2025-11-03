import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

try {
  const { data, error } = await supabase.from('projects').select('*').limit(1)
  if (error) {
    const missingTable = typeof error.message === 'string' && error.message.includes('Could not find the table')
    if (missingTable) {
      console.log('Supabase connection OK, but expected table "projects" is not defined yet.')
      process.exit(0)
    }

    console.error('Supabase responded with an error:', error.message)
    console.error('Check that the target table exists and credentials have the right permissions.')
    process.exitCode = 1
  } else {
    console.log('Supabase connection OK. Sample payload:')
    console.dir(data, { depth: null })
  }
} catch (err) {
  console.error('Unexpected Supabase error:', err)
  process.exitCode = 1
}
