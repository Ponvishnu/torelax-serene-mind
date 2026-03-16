
-- Drop foreign key constraints on user_id for testing
ALTER TABLE public.addresses DROP CONSTRAINT IF EXISTS addresses_user_id_fkey;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
