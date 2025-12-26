
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
const About = () => {
  const [searchParams] = useSearchParams();
  const isFeatureEnabled = searchParams.get('feature') === 'show';
  const teamMembers = [{
    name: 'Klaus',
    role: 'Founder & Curator',
    bio: 'With a lifelong passion for design and history, Klaus founded Midcentury Decor to share his love for timeless furniture. He meticulously sources each piece, ensuring it meets his high standards of quality and authenticity.',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36'
  }, {
    name: 'Greta',
    role: 'Restoration Specialist',
    bio: 'Greta breathes new life into every vintage find. Her expertise in restoration techniques and her delicate touch ensure that each piece notophen looks beautiful but is also ready for a new generation of use.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956'
  }, {
    name: 'Lars',
    role: 'Logistics & Customer Care',
    bio: 'Lars makes sure your new treasure arrives safely. He manages all logistics, from packing to shipping, and is always ready to assist with any questions, ensuring a smooth and happy experience for our customers.',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5'
  }];
  return <>
          <Helmet>
            <title>About Us - Midcentury Decor</title>
            <meta name="description" content="Learn about the passion and people behind Midcentury Decor. Discover our story and our commitment to curating authentic vintage pieces from Berlin." />
          </Helmet>
    
          <div className="bg-white">
            <header className="bg-white py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="text-5xl font-light tracking-tight text-gray-900 mb-4">Our story</motion.h1>
                <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Viva Earth was created with a simple belief: wellness is most powerful when it stays close to nature.

What began as a commitment to sourcing quality botanicals has grown into a brand dedicated to intentional living and everyday well-being. We work with trusted partners who respect natural processes and time-honored practices, allowing ingredients to retain their true character.

Every Viva Earth product reflects a commitment to nature—pure in intent, careful in choice, and designed to support mindful wellness rituals.
Our focus is not on excess or complexity, but on clarity, balance, and trust in what nature provides.</motion.p>
              </div>
            </header>
    
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }}>
                    <img className="rounded-2xl w-full h-full object-cover aspect-[4/3]" alt="Three bottles of Viva Earth essential oils (Frankincense, Peppermint, Bergamot) on a woven tray with natural decor" src="https://horizons-cdn.hostinger.com/3cba9943-6ccc-4d25-8e75-95aac06a5962/5cfe437ce9f9ebef03dc67217e0b3893.jpg" />
                  </motion.div>
                  <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }}>
                    <h2 className="text-4xl font-light text-gray-900">Our philosophy</h2>
                    <p className="mt-4 text-lg text-gray-600">We believe wellness should feel honest, grounded, and uncomplicated.

Our approach begins with thoughtful sourcing and continues with a deep respect for natural origins. Each ingredient is selected for its integrity and purpose, not trends or exaggerated claims.</p>
                    <p className="mt-4 text-lg text-gray-600">Sustainability and responsibility guide every decision we make—from how ingredients are chosen to how products are brought to you. Viva Earth exists to support calm, balance, and everyday rituals that feel intentional, natural, and lasting.</p>
                  </motion.div>
                </div>
              </div>
            </section>
    
            {isFeatureEnabled && (
              <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-light text-gray-900">Meet the team</h2>
                    <p className="mt-4 text-lg text-gray-600">The passionate individuals behind our collection.</p>
                  </div>
                  <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member, index) => <motion.div key={member.name} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.6,
                delay: index * 0.1
              }} className="text-center">
                        <img className="mx-auto h-40 w-40 rounded-full object-cover" src={member.image} alt={`Portrait of ${member.name}`} />
                        <h3 className="mt-6 text-xl font-medium text-gray-900">{member.name}</h3>
                        <p className="text-gray-600">{member.role}</p>
                        <p className="mt-2 text-gray-500 max-w-xs mx-auto">{member.bio}</p>
                      </motion.div>)}
                  </div>
                </div>
              </section>
            )}
    
            <section className="py-20">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-light text-gray-900">Join our community</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Ready to find your next treasure? Browse our collection or get in touch if you're looking for something specific. We're here to help you create the home of your dreams.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <a href="https://www.amazon.com/s?k=Viva+Earth&ref=bl_dp_s_web_0" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-3">
                      Shop Now on Amazon
                    </Button>
                  </a>
                  <Link to="/contact">
                    <Button variant="outline" className="rounded-full px-8 py-3">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </>;
};
export default About;
