# How to Add 5 Sample Doctors to Your Database

## Quick Steps to Add Doctors:

### Step 1: Access Your Supabase Dashboard
1. Go to your Supabase project dashboard
2. Click on "Authentication" in the left sidebar
3. Click on "Users" 

### Step 2: Create 5 Users
Click "Add user" for each doctor and create users with these credentials:

#### Doctor 1 - Cardiologist
- **Email:** sarah.johnson@healthcare.com
- **Password:** Doctor123!
- **Full Name:** Dr. Sarah Johnson

#### Doctor 2 - Pediatrician  
- **Email:** michael.chen@healthcare.com
- **Password:** Doctor123!
- **Full Name:** Dr. Michael Chen

#### Doctor 3 - Dermatologist
- **Email:** emily.rodriguez@healthcare.com
- **Password:** Doctor123!
- **Full Name:** Dr. Emily Rodriguez

#### Doctor 4 - Orthopedic Surgeon
- **Email:** james.wilson@healthcare.com
- **Password:** Doctor123!
- **Full Name:** Dr. James Wilson

#### Doctor 5 - Neurologist
- **Email:** priya.sharma@healthcare.com
- **Password:** Doctor123!
- **Full Name:** Dr. Priya Sharma

### Step 3: Run the SQL Script
1. In Supabase Dashboard, go to "SQL Editor"
2. Click "New query"
3. Copy and paste the contents of `supabase/seed-doctors.sql`
4. Click "Run" to execute the script
5. The script will automatically:
   - Update the profiles with doctor names
   - Add doctor roles to each user
   - Create doctor entries with specialties

### Step 4: Verify
1. Go to "Table Editor" → "doctors"
2. You should see 5 doctors listed
3. Now go to your app and navigate to the Patient Portal
4. You should see all 5 doctors in the selection dropdown

## That's it! Your doctors are now available in the application.

---

**Note:** The default password for all doctors is `Doctor123!`. You can change this in the Supabase Auth section after creating the users.


