# 🚀 Quick Start Guide - Adding Doctors to Your Application

## Your app is running on: http://localhost:8080

To add the 5 sample doctors to your database, follow these steps:

---

## 📋 Step-by-Step Instructions:

### Step 1: Open Your Supabase Dashboard
1. Go to https://supabase.com and sign in
2. Select your project
3. If you don't have a project yet, create one first

### Step 2: Create 5 Doctor Users
1. In Supabase Dashboard, click **"Authentication"** → **"Users"**
2. Click **"+ Add user"** button
3. Create users one by one with these details:

#### Doctor 1:
- **Email:** `sarah.johnson@healthcare.com`
- **Password:** `Doctor123!`
- Click "Create user"

#### Doctor 2:
- **Email:** `michael.chen@healthcare.com`
- **Password:** `Doctor123!`
- Click "Create user"

#### Doctor 3:
- **Email:** `emily.rodriguez@healthcare.com`
- **Password:** `Doctor123!`
- Click "Create user"

#### Doctor 4:
- **Email:** `james.wilson@healthcare.com`
- **Password:** `Doctor123!`
- Click "Create user"

#### Doctor 5:
- **Email:** `priya.sharma@healthcare.com`
- **Password:** `Doctor123!`
- Click "Create user"

---

### Step 3: Run the SQL Script
1. In Supabase Dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"** button
3. Open the file `supabase/seed-doctors.sql` in your project
4. **Copy ALL the contents** from that file
5. **Paste** it into the Supabase SQL Editor
6. Click **"Run"** button (or press Ctrl+Enter)
7. You should see a success message

---

### Step 4: Verify the Doctors
1. In Supabase Dashboard, click **"Table Editor"**
2. Select the **"doctors"** table
3. You should see 5 rows with doctor information
4. Select the **"profiles"** table to see the doctor names

---

### Step 5: View in Your Application
1. Open your browser and go to: **http://localhost:8080**
2. Sign in with any account (or create a patient account)
3. Click **"Book Appointment"** in the header
4. You should now see all 5 doctors in the selection list!

---

## ✅ Expected Result:
- 5 doctors available for selection
- Calendar showing current month on the right
- Doctor list with specialties visible
- Ability to book appointments

---

## 🔧 Troubleshooting:

**If you see "No doctors available":**
- Make sure you created all 5 users in Authentication
- Make sure you ran the SQL script successfully
- Check the Supabase console for any errors

**If the server is not running:**
```bash
npm run dev
```

**To check if doctors were added:**
- Go to Supabase Dashboard → Table Editor → doctors
- You should see 5 entries

---

## 📝 Notes:
- All doctors use the same password: `Doctor123!`
- The doctors have different specialties (Cardiologist, Pediatrician, etc.)
- You can change passwords later in the Authentication section
- The application automatically loads doctors from the database

---

## 🎉 You're Done!
Your application now has 5 doctors ready for booking appointments!

