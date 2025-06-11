
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Target, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">About Springing Stars Junior School</h1>
          <p className="text-lg text-gray-600">
            Nurturing young minds for a brighter tomorrow in Uganda
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Springing Stars Junior School is a premier educational institution located in Uganda, 
                dedicated to providing quality primary education that prepares our students for success 
                in their academic journey and beyond.
              </p>
              
              <p className="leading-relaxed">
                Founded with the vision of nurturing young minds, we have been serving the Ugandan 
                community for over a decade, providing holistic education that combines academic 
                excellence with character development and practical life skills.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-600" />
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To provide quality, affordable and accessible education that empowers every child 
                to reach their full potential while instilling strong moral values and preparing 
                them for productive citizenship in Uganda and beyond.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-red-600" />
                <span>Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                To be the leading primary school in Uganda, recognized for excellence in education, 
                character development, and preparing globally competitive students who contribute 
                meaningfully to society.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-green-600" />
                <span>Our Values</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>• Excellence in Education</li>
                <li>• Integrity and Honesty</li>
                <li>• Respect for All</li>
                <li>• Innovation and Creativity</li>
                <li>• Community Service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-purple-600" />
                <span>Our Community</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We serve over 500 students from Primary 1 to Primary 7, with a dedicated team 
                of qualified teachers and support staff committed to each child's success and 
                well-being.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;
