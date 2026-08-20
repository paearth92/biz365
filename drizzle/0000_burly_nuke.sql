CREATE TABLE `device_batches` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`product_type` text NOT NULL,
	`quantity` integer NOT NULL,
	`base_url` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `devices` (
	`id` text PRIMARY KEY NOT NULL,
	`batch_id` text NOT NULL,
	`public_code` text NOT NULL,
	`product_type` text NOT NULL,
	`status` text DEFAULT 'unused' NOT NULL,
	`owner_email` text,
	`label` text,
	`destination_type` text,
	`destination_url` text,
	`scan_count` integer DEFAULT 0 NOT NULL,
	`claimed_at` text,
	`last_scanned_at` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`batch_id`) REFERENCES `device_batches`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `devices_public_code_unique` ON `devices` (`public_code`);--> statement-breakpoint
CREATE INDEX `devices_batch_id_idx` ON `devices` (`batch_id`);--> statement-breakpoint
CREATE INDEX `devices_owner_email_idx` ON `devices` (`owner_email`);--> statement-breakpoint
CREATE INDEX `devices_status_idx` ON `devices` (`status`);