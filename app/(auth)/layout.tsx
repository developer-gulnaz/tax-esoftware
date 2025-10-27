// app/(auth)/layout.tsx

import Flex from 'components/common/Flex';
import { Metadata } from 'next';
import { Container } from 'react-bootstrap';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Login page',
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex tag='main' direction='column' justifyContent='center' className='vh-100'>
      <section>
        <Container>{children}</Container>
      </section>
      <div className='custom-container'></div>
    </Flex>
  );
};

export default AuthLayout;
