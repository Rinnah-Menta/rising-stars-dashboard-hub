
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Disclaimer = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">Disclaimer</h1>
          <p className="text-lg text-gray-600">
            Important information about the use of our services
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Educational Services</h2>
              <p className="text-gray-700">
                While Springing Stars Junior School strives to provide quality education and maintain 
                high academic standards, we cannot guarantee specific academic outcomes or university 
                admissions. Student success depends on various factors including individual effort, 
                attendance, and engagement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Health and Safety</h2>
              <p className="text-gray-700">
                The school takes reasonable measures to ensure student safety but cannot be held 
                liable for accidents, injuries, or health issues that may occur on school premises 
                or during school activities. Parents are advised to ensure their children have 
                appropriate medical insurance coverage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Property and Belongings</h2>
              <p className="text-gray-700">
                The school is not responsible for lost, stolen, or damaged personal property belonging 
                to students. Parents are advised not to send valuable items to school with their children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Technology and Internet Use</h2>
              <p className="text-gray-700">
                While the school provides internet access for educational purposes, we cannot monitor 
                all online activities. Parents should discuss appropriate internet use with their 
                children and understand that the school cannot be held responsible for inappropriate 
                content accessed online.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Weather and Natural Events</h2>
              <p className="text-gray-700">
                The school may need to close or modify operations due to severe weather, natural 
                disasters, or other circumstances beyond our control. In such cases, the school 
                will not be liable for any inconvenience or additional costs incurred by families.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Transportation</h2>
              <p className="text-gray-700">
                If transportation services are provided, they are subject to traffic conditions 
                and mechanical reliability. The school cannot guarantee exact pickup and drop-off 
                times and is not liable for delays caused by traffic or vehicle issues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Policy Changes</h2>
              <p className="text-gray-700">
                The school reserves the right to modify policies, procedures, and this disclaimer 
                at any time. Significant changes will be communicated to parents through official 
                school channels.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Disclaimer;
