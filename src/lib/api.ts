/**
 * Landing Page API Client
 * ─────────────────────────────────────────────────────────────
 * Uses NEXT_PUBLIC_API_URL from .env.local to call the NestJS backend.
 * 
 * NEXT_PUBLIC_* vars are inlined at build time by Next.js and are
 * safe to use in both Server Components and Client Components.
 */

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') + '/api';

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    // Next.js cache: use 'no-store' for dynamic, or 'force-cache' for static
    next: { revalidate: 60 }, // Revalidate every 60s (ISR)
  });

  if (!res.ok) {
    let message = `API Error ${res.status}`;
    try {
      const body = await res.json();
      message = body?.message ?? message;
    } catch {
      // ignore JSON parse error
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

// ─── Auth ──────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  name: string;
  whatsapp: string;
  email: string;
  password: string;
  child_name: string;
  child_age: number;
  child_tempat_lahir: string;
  child_tanggal_lahir: string;
  child_jenis_kelamin: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string | null;
    whatsapp: string;
    role: string;
  };
}

export const authApi = {
  register: (data: RegisterPayload): Promise<AuthResponse> =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  login: (data: { email?: string; whatsapp?: string; password: string }): Promise<AuthResponse> =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};

// ─── Layanan (Public) ────────────────────────────────────────────────────────

export interface LayananStats {
  durasi_sesi: string;
  format_layanan: string;
  mulai_dari: string;
}

export interface LayananProgram {
  title: string;
  desc: string;
  harga: string;
}

export interface LayananItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image_url: string;
  stats: LayananStats;
  mengapa_memilih: string[];
  isu_permasalahan: string[];
  programs: LayananProgram[];
  is_active: boolean;
  sort_order: number;
}

export interface LayananCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  sort_order: number;
  layanan: LayananItem[];
}

export const layananApi = {
  /** GET all layanan (optionally grouped by category) */
  getAll: (): Promise<LayananItem[]> =>
    request('/layanan', { next: { revalidate: 300 } } as RequestInit),

  /** GET layanan detail by slug */
  getBySlug: (slug: string): Promise<LayananItem> =>
    request(`/layanan/${slug}`, { next: { revalidate: 300 } } as RequestInit),
};

// ─── Apply / Patient Form (Public) ──────────────────────────────────────────

export interface ApplyPayload {
  nama_lengkap: string;
  usia?: number;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: string;
  email_ortu?: string;
  no_telepon: string;
  nama_ayah?: string;
  nama_ibu?: string;
  alamat?: string;
  jenis_terapi?: string;
  pendidikan_anak?: string;
  catatan_internal?: string;
}

export const applyApi = {
  submit: (data: ApplyPayload): Promise<{ success: boolean; message: string; patientId: number }> =>
    request('/apply', { method: 'POST', body: JSON.stringify(data), next: { revalidate: 0 } } as RequestInit),
};

// ─── Therapists (Public) ────────────────────────────────────────────────────

export interface PublicTherapist {
  id: number;
  name: string;
  specialization: string | null;
  phone: string | null;
  bio: string | null;
  photo_url: string | null;
}

export const therapistApi = {
  getAll: (): Promise<PublicTherapist[]> =>
    request('/therapists', { next: { revalidate: 300 } } as RequestInit),
};

// ─── Patients / Active Therapies (Authenticated Parent) ──────────────────────────

export interface ClientPatient {
  id: number;
  nama_lengkap: string;
  usia: string | number;
  jenis_terapi: string;
  status: string;
}

export const patientsApi = {
  getMyActiveTherapies: (token: string): Promise<ClientPatient[]> =>
    request('/patients/me/active-therapies', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    } as RequestInit),
};

// ─── Appointments (Authenticated Parent) ──────────────────────────────────────────

export interface ClientAppointment {
  id: number;
  scheduled_at: string;
  duration_minutes: number;
  notes: string;
  status: string;
  patient: {
    nama_lengkap: string;
  };
  therapist: {
    name: string;
    specialization: string;
  };
}

export const appointmentsApi = {
  getMyAppointments: (token: string): Promise<ClientAppointment[]> =>
    request('/appointments/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    } as RequestInit),
};

// ─── Invoices (Authenticated Parent) ──────────────────────────────────────────────

export interface ClientInvoice {
  id: number;
  invoice_number: string;
  total_amount: number;
  status: string;
  due_date: string;
  paid_at: string | null;
  payment_proof?: string;
  items: { description: string; amount: number }[];
  patient: {
    nama_lengkap: string;
  };
}

export const invoicesApi = {
  getMyInvoices: (token: string): Promise<ClientInvoice[]> =>
    request('/invoices/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    } as RequestInit),
};

// ─── Partnerships (Public) ──────────────────────────────────────────────────

export interface PartnershipItem {
  id: number;
  name: string;
  slug: string;
  logo_url: string;
  sort_order: number;
  is_active: boolean;
}

export const partnershipApi = {
  getActive: (): Promise<PartnershipItem[]> =>
    request('/partnerships', {
      method: 'GET',
      next: { revalidate: 60 },
    }),
};

// ─── Partnership Why Us (Public) ────────────────────────────────────────────

export interface PartnershipWhyUsItem {
  id: number;
  title: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}

export const partnershipWhyUsApi = {
  getActive: (): Promise<PartnershipWhyUsItem[]> =>
    request('/partnership-why-us', { next: { revalidate: 60 } }),
};

// ─── Partnership Collaborations (Public) ────────────────────────────────────

export interface PartnershipCollaborationItem {
  id: number;
  title: string;
  description: string;
  images: string[];
  sort_order: number;
  is_active: boolean;
}

export const partnershipCollaborationsApi = {
  getActive: (): Promise<PartnershipCollaborationItem[]> =>
    request('/partnership-collaborations', { next: { revalidate: 60 } }),
};

// ─── Partnership Moments (Public) ───────────────────────────────────────────

export interface PartnershipMomentItem {
  id: number;
  title: string;
  img_url: string;
  sort_order: number;
  is_active: boolean;
}

export const partnershipMomentsApi = {
  getActive: (): Promise<PartnershipMomentItem[]> =>
    request('/partnership-moments', { next: { revalidate: 60 } }),
};
