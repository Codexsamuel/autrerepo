import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: patients, error } = await supabase
      .from('hospital_patients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ patients });
  } catch (error) {
    console.error('Erreur lors de la récupération des patients:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des patients' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      patientNumber, 
      firstName, 
      lastName, 
      dateOfBirth, 
      gender, 
      phone, 
      email, 
      address, 
      bloodType, 
      emergencyContact 
    } = body;

    const { data, error } = await supabase
      .from('hospital_patients')
      .insert([
        {
          patient_number: patientNumber,
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth,
          gender,
          phone,
          email,
          address,
          blood_type: bloodType,
          emergency_contact: emergencyContact,
          status: 'actif'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ patient: data });
  } catch (error) {
    console.error('Erreur lors de la création du patient:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du patient' },
      { status: 500 }
    );
  }
} 