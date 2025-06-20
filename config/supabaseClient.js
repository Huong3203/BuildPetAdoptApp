// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kawesckhczawqqfgscyx.supabase.co' // link project của bạn
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthd2VzY2toY3phd3FxZmdzY3l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzI3MzgsImV4cCI6MjA2MzYwODczOH0.JS1GMaQ9bj8i-p-gr0ZlgXFaqSuCKUv2rTa6ntakJcw' // bạn lấy ở Supabase Dashboard, phần API > anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
