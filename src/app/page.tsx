import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Differentiation from '@/components/sections/Differentiation';
import ForWho from '@/components/sections/ForWho';
import Services from '@/components/sections/Services';
import FreeDiagnostic from '@/components/sections/FreeDiagnostic';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Differentiation />
      <ForWho />
      <Services />
      <FreeDiagnostic />
      <Footer />
    </>
  );
}
