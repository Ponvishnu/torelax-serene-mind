
-- Temporarily allow anon users to insert/select/update addresses and orders for testing
CREATE POLICY "anon_select_addresses" ON public.addresses FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_addresses" ON public.addresses FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select_orders" ON public.orders FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_orders" ON public.orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_orders" ON public.orders FOR UPDATE TO anon USING (true) WITH CHECK (true);
