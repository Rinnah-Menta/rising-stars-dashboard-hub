
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Information We Collect</h2>
              <p className="text-gray-700 mb-3">
                Springing Stars Junior School collects information necessary for educational purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Student personal information (name, age, address, parent details)</li>
                <li>Academic records and progress reports</li>
                <li>Medical information relevant to student care</li>
                <li>Emergency contact information</li>
                <li>Financial information for fee payment processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">How We Use Information</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Providing educational services and student care</li>
                <li>Communicating with parents and guardians</li>
                <li>Processing fee payments and financial records</li>
                <li>Ensuring student safety and emergency response</li>
                <li>Generating academic reports and transcripts</li>
                <li>Complying with legal and regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Information Sharing</h2>
              <p className="text-gray-700">
                We do not share student information with third parties except:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-3">
                <li>With parent/guardian consent</li>
                <li>When required by law or regulatory authorities</li>
                <li>For educational transfers with proper authorization</li>
                <li>In emergency situations concerning student safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect student information against 
                unauthorized access, alteration, disclosure, or destruction. Physical and digital 
                records are secured according to industry best practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Parent Rights</h2>
              <p className="text-gray-700">
                Parents have the right to access, review, and request corrections to their child's 
                educational records. Requests should be made in writing to the school administration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-3">Contact Us</h2>
              <p className="text-gray-700">
                For questions about this Privacy Policy, please contact us at 
                info@springingstars.ac.ug or +256 700 123 456.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Privacy;
