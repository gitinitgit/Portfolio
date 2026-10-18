import React from 'react';
import { Layout, Head, Hero, About, Jobs, Featured, Projects, Contact } from '@components';

const IndexPage = () => (
  <Layout>
    <Head />
    <main>
      <Hero />
      <About />
      <Jobs />
      <Featured />
      <Projects />
      <Contact />
    </main>
  </Layout>
);

export default IndexPage;
