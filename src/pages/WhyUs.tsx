
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Users, 
  Award, 
  Globe, 
  Shield, 
  Heart,
  Clock,
  Laptop
} from 'lucide-react';

const WhyUs = () => {
  const reasons = [
    {
      icon: BookOpen,
      title: 'Quality Education',
      description: 'Our curriculum follows the Ugandan National Curriculum with international best practices, ensuring comprehensive learning.',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Qualified Teachers',
      description: 'Our experienced and dedicated teachers are committed to bringing out the best in every child.',
      color: 'text-green-600'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Consistent excellent performance in Primary Leaving Examinations (PLE) with high pass rates.',
      color: 'text-yellow-600'
    },
    {
      icon: Globe,
      title: 'Holistic Development',
      description: 'We focus on academic, social, emotional, and physical development of every child.',
      color: 'text-purple-600'
    },
    {
      icon: Shield,
      title: 'Safe Environment',
      description: 'A secure, nurturing environment where children can learn and grow with confidence.',
      color: 'text-red-600'
    },
    {
      icon: Heart,
      title: 'Character Building',
      description: 'We instill strong moral values, integrity, and leadership qualities in our students.',
      color: 'text-pink-600'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Morning and afternoon sessions available to accommodate different family needs.',
      color: 'text-indigo-600'
    },
    {
      icon: Laptop,
      title: 'Modern Facilities',
      description: 'Well-equipped classrooms, library, computer lab, and sports facilities for comprehensive learning.',
      color: 'text-teal-600'
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">Why Choose Springing Stars?</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover what makes Springing Stars Junior School the preferred choice for quality 
            primary education in Uganda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <reason.icon className={`h-8 w-8 ${reason.color}`} />
                  <span className="text-lg">{reason.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Join Our Growing Family
            </h2>
            <p className="text-lg text-blue-700 mb-6">
              Enroll your child today and give them the foundation for a successful future.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-blue-700">Happy Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">30+</div>
                <div className="text-blue-700">Qualified Teachers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">10+</div>
                <div className="text-blue-700">Years of Excellence</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WhyUs;
