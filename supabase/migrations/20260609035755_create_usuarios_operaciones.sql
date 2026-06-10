
-- Tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre_completo text NOT NULL,
  dni text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  telefono text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_usuario" ON usuarios FOR SELECT
  TO authenticated USING (auth.uid() = auth_id);

CREATE POLICY "insert_own_usuario" ON usuarios FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "update_own_usuario" ON usuarios FOR UPDATE
  TO authenticated USING (auth.uid() = auth_id) WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "delete_own_usuario" ON usuarios FOR DELETE
  TO authenticated USING (auth.uid() = auth_id);

-- Tabla operaciones
CREATE TABLE IF NOT EXISTS operaciones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  tipo text NOT NULL CHECK (tipo IN ('compra', 'venta')),
  moneda_origen text NOT NULL CHECK (moneda_origen IN ('USD', 'PEN')),
  monto_envia numeric(18, 4) NOT NULL,
  monto_recibe numeric(18, 4) NOT NULL,
  tipo_cambio_usado numeric(10, 4) NOT NULL,
  estado text NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'completado')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE operaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_operaciones" ON operaciones FOR SELECT
  TO authenticated USING (
    usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid())
  );

CREATE POLICY "insert_own_operaciones" ON operaciones FOR INSERT
  TO authenticated WITH CHECK (
    usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid())
  );

CREATE POLICY "update_own_operaciones" ON operaciones FOR UPDATE
  TO authenticated USING (
    usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid())
  ) WITH CHECK (
    usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid())
  );

CREATE POLICY "delete_own_operaciones" ON operaciones FOR DELETE
  TO authenticated USING (
    usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid())
  );
