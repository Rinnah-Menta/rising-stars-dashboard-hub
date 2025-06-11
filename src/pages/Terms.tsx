
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By enrolling your child at Springing Stars Junior School and using our services, 
                you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">2. School Fees and Payments</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>School fees must be paid in full at the beginning of each term</li>
                <li>Late payment fees may apply for overdue accounts</li>
                <li>All fees are quoted in Ugandan Shillings (UGX)</li>
                <li>No refunds for partial terms except in exceptional circumstances</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">3. Student Conduct</h2>
              <p className="text-gray-700">
                Students are expected to maintain good discipline, respect for teachers and fellow students, 
                and adherence to the school's code of conduct. Serious misconduct may result in suspension 
                or expulsion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">4. Academic Standards</h2>
              <p className="text-gray-700">
                Students are expected to maintain satisfactory academic progress. The school reserves 
                the right to require additional support or recommend alternative educational arrangements 
                if a student consistently fails to meet academic requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">5. Health and Safety</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Parents must provide accurate medical information for their children</li>
                <li>Students with contagious illnesses must not attend school</li>
                <li>The school maintains a safe environment but cannot guarantee against all accidents</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">6. Communication</h2>
              <p className="text-gray-700">
                Parents are encouraged to maintain regular communication with teachers and school 
                administration. Official communications will be conducted through the school's 
                designated channels.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Terms;
