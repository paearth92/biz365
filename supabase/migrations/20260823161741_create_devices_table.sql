/*
# Create devices table for NFCPlate activation system

## Overview
Creates a `devices` table to store NFCPlate device activations. When a customer
taps or scans their NFCPlate product, they land on an activation page where they
enter a destination URL (e.g. their Google review page). The device code links
the physical product to the digital destination.

## New Tables
- `devices`
  - `id` (uuid, primary key)
  - `code` (text, unique) — the activation code printed on the NFCPlate product
  - `label` (text) — a user-friendly name for the device (e.g. "Front counter stand")
  - `destination_url` (text) — the URL the NFC tap/QR scan redirects to
  - `activated_at` (timestamptz) — when the device was activated
  - `created_at` (timestamptz) — when the record was created
  - `updated_at` (timestamptz) — when the record was last updated

## Security
- RLS enabled on `devices`.
- This is a no-auth app (no sign-in screen), so all CRUD policies use
  `TO anon, authenticated` so the anon-key frontend can read and write device data.
- The data is intentionally public/shared — any visitor can activate a device
  by entering a code.

## Indexes
- Unique index on `code` for fast lookups during activation and redirect.
*/

CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  label text DEFAULT 'My NFCPlate',
  destination_url text NOT NULL DEFAULT '',
  activated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_devices" ON devices;
CREATE POLICY "anon_select_devices" ON devices FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_devices" ON devices;
CREATE POLICY "anon_insert_devices" ON devices FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_devices" ON devices;
CREATE POLICY "anon_update_devices" ON devices FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_devices" ON devices;
CREATE POLICY "anon_delete_devices" ON devices FOR DELETE
  TO anon, authenticated USING (true);
