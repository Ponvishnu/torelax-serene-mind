
-- Disable RLS entirely on addresses and orders for testing
ALTER TABLE public.addresses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
