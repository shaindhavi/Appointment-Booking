-- ==========================================
-- SEED DOCTORS SQL SCRIPT
-- ==========================================
-- This script automatically sets up 5 sample doctors
-- 
-- PREREQUISITE: First create 5 users in Authentication section with these emails:
-- - sarah.johnson@healthcare.com
-- - michael.chen@healthcare.com
-- - emily.rodriguez@healthcare.com
-- - james.wilson@healthcare.com
-- - priya.sharma@healthcare.com
--
-- Then run this script in Supabase SQL Editor

DO $$
DECLARE
    user_rec RECORD;
BEGIN
    -- Loop through each doctor email
    FOR user_rec IN SELECT id, email FROM auth.users WHERE email IN (
        'sarah.johnson@healthcare.com',
        'michael.chen@healthcare.com',
        'emily.rodriguez@healthcare.com',
        'james.wilson@healthcare.com',
        'priya.sharma@healthcare.com'
    ) LOOP
        
        -- Update profile with doctor information
        UPDATE public.profiles 
        SET full_name = CASE user_rec.email
            WHEN 'sarah.johnson@healthcare.com' THEN 'Dr. Sarah Johnson'
            WHEN 'michael.chen@healthcare.com' THEN 'Dr. Michael Chen'
            WHEN 'emily.rodriguez@healthcare.com' THEN 'Dr. Emily Rodriguez'
            WHEN 'james.wilson@healthcare.com' THEN 'Dr. James Wilson'
            WHEN 'priya.sharma@healthcare.com' THEN 'Dr. Priya Sharma'
            ELSE full_name
        END,
        phone = CASE user_rec.email
            WHEN 'sarah.johnson@healthcare.com' THEN '+1-555-0101'
            WHEN 'michael.chen@healthcare.com' THEN '+1-555-0102'
            WHEN 'emily.rodriguez@healthcare.com' THEN '+1-555-0103'
            WHEN 'james.wilson@healthcare.com' THEN '+1-555-0104'
            WHEN 'priya.sharma@healthcare.com' THEN '+1-555-0105'
            ELSE phone
        END
        WHERE id = user_rec.id;

        -- Add doctor role
        INSERT INTO public.user_roles (user_id, role)
        VALUES (user_rec.id, 'doctor')
        ON CONFLICT (user_id, role) DO UPDATE SET role = 'doctor';

        -- Insert doctor entry with specialty and bio
        INSERT INTO public.doctors (user_id, specialty, bio)
        VALUES (
            user_rec.id,
            CASE user_rec.email
                WHEN 'sarah.johnson@healthcare.com' THEN 'Cardiologist'
                WHEN 'michael.chen@healthcare.com' THEN 'Pediatrician'
                WHEN 'emily.rodriguez@healthcare.com' THEN 'Dermatologist'
                WHEN 'james.wilson@healthcare.com' THEN 'Orthopedic Surgeon'
                WHEN 'priya.sharma@healthcare.com' THEN 'Neurologist'
            END,
            CASE user_rec.email
                WHEN 'sarah.johnson@healthcare.com' THEN 'Expert in heart health and cardiovascular diseases with over 15 years of experience'
                WHEN 'michael.chen@healthcare.com' THEN 'Specializing in children''s health and development, with a gentle and caring approach'
                WHEN 'emily.rodriguez@healthcare.com' THEN 'Board-certified dermatologist specializing in skin health and cosmetic procedures'
                WHEN 'james.wilson@healthcare.com' THEN 'Expert in bone, joint, and muscle health with advanced surgical techniques'
                WHEN 'priya.sharma@healthcare.com' THEN 'Specializing in nervous system disorders and brain health, with a focus on patient care'
            END
        )
        ON CONFLICT (user_id) DO UPDATE SET
            specialty = EXCLUDED.specialty,
            bio = EXCLUDED.bio;
        
        RAISE NOTICE 'Processed doctor: %', user_rec.email;
    END LOOP;
    
    RAISE NOTICE 'Doctor seeding completed successfully!';
END $$;

