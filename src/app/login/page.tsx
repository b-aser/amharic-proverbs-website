import { login } from './actions';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams;

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center bg-[var(--color-parchment)] py-16 px-6 w-full">
        <form className="bg-white p-8 rounded-xl shadow-[var(--shadow-card)] border border-[var(--color-border-eth)] w-full max-w-sm space-y-4">
          <h1 className="font-display text-2xl text-[var(--color-earth-dark)] text-center mb-6">Admin Sign In</h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100 text-center mb-4">
              Invalid login credentials.
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required className="w-full px-4 py-2 border rounded-md outline-none focus:border-[var(--color-gold)]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--color-earth-dark)] mb-2" htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required className="w-full px-4 py-2 border rounded-md outline-none focus:border-[var(--color-gold)]" />
          </div>
          
          <button formAction={login} className="w-full py-3 bg-[var(--color-earth-dark)] text-white rounded-md font-semibold hover:bg-[var(--color-gold)] hover:text-[var(--color-earth-dark)] transition-colors mt-4">
            Sign In
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
