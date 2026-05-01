import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let isAuthorized = false;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (profile?.role === 'admin') {
        isAuthorized = true;
      }
    }
  } catch (error) {
    // If Supabase isn't configured
  }

  if (!isAuthorized) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      <header className="bg-[var(--color-earth-dark)] text-white p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/admin/submissions" className="font-serif-en font-semibold tracking-wider hover:opacity-80 transition-opacity">
            AMHARic PROVERBS <span className="text-[var(--color-gold)]">ADMIN</span>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/admin/submissions" className="text-sm text-white/70 hover:text-white transition-colors">Submissions</Link>
            <Link href="/admin/settings" className="text-sm text-white/70 hover:text-white transition-colors">Settings</Link>
            <Link href="/" className="text-sm text-[var(--color-gold-light)] hover:opacity-80 transition-opacity ml-4">View Live Site</Link>
            <form action={async () => {
              'use server';
              const supabase = await createClient();
              await supabase.auth.signOut();
              redirect('/');
            }}>
              <button className="text-sm text-white/70 hover:text-white transition-colors border border-white/20 px-3 py-1.5 rounded-full ml-2">Sign Out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
