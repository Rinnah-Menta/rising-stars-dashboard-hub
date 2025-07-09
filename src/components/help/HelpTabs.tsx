
import React, { useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FAQSection } from './FAQSection';
import { UserGuideSection } from './UserGuideSection';
import { ResourcesSection } from './ResourcesSection';

export const HelpTabs: React.FC = () => {
  const faqRef = useRef<HTMLDivElement>(null);
  const userGuideRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (value: string) => {
    setTimeout(() => {
      let targetRef;
      switch (value) {
        case 'faq':
          targetRef = faqRef;
          break;
        case 'guide':
          targetRef = userGuideRef;
          break;
        case 'resources':
          targetRef = resourcesRef;
          break;
        default:
          return;
      }
      
      targetRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <Tabs defaultValue="faq" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="faq" onClick={() => handleTabClick('faq')}>FAQ</TabsTrigger>
        <TabsTrigger value="guide" onClick={() => handleTabClick('guide')}>User Guide</TabsTrigger>
        <TabsTrigger value="resources" onClick={() => handleTabClick('resources')}>Resources</TabsTrigger>
      </TabsList>

      <TabsContent value="faq" ref={faqRef}>
        <FAQSection />
      </TabsContent>

      <TabsContent value="guide" ref={userGuideRef}>
        <UserGuideSection />
      </TabsContent>

      <TabsContent value="resources" ref={resourcesRef}>
        <ResourcesSection />
      </TabsContent>
    </Tabs>
  );
};
