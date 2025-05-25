
import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Grid, Users, Trophy } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg"></div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                CardCraft
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/marketplace" className="text-gray-600 hover:text-gray-900 transition-colors">
                Marketplace
              </Link>
              <Link to="/editor" className="text-gray-600 hover:text-gray-900 transition-colors">
                Editor
              </Link>
              <button className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Design Beautiful
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> Cards </span>
            Effortlessly
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create stunning card designs with our intuitive editor. Choose from hundreds of templates or build your own from scratch with real-time preview and collaboration features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/editor"
              className="inline-flex items-center justify-center px-8 py-4 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Start Creating
            </Link>
            <Link 
              to="/marketplace"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold border-2 border-violet-600 hover:bg-violet-50 transition-colors"
            >
              <Grid className="w-5 h-5 mr-2" />
              Browse Templates
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Wand2 className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Intuitive Editor</h3>
              <p className="text-gray-600">
                Design with ease using our drag-and-drop interface. Real-time preview shows your changes instantly.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Grid className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rich Templates</h3>
              <p className="text-gray-600">
                Choose from hundreds of professionally designed templates or create your own unique designs.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600">
                Work together with your team in real-time. Share designs and get feedback instantly.
              </p>
            </div>
          </div>

          {/* Sample Cards Preview */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">See What's Possible</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {/* Sample Card 1 */}
              <div 
                className="w-80 h-48 rounded-2xl shadow-xl transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="text-center text-white">
                  <h3 className="text-xl font-semibold mb-2">Gradient Magic</h3>
                  <p className="text-white/80">Beautiful gradients made simple</p>
                </div>
              </div>

              {/* Sample Card 2 */}
              <div 
                className="w-80 h-48 rounded-xl shadow-lg border transition-transform hover:scale-105"
                style={{
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="text-center text-gray-800">
                  <h3 className="text-xl font-semibold mb-2">Clean & Minimal</h3>
                  <p className="text-gray-600">Less is more philosophy</p>
                </div>
              </div>

              {/* Sample Card 3 */}
              <div 
                className="w-80 h-48 rounded-3xl shadow-2xl transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="text-center text-white">
                  <h3 className="text-xl font-semibold mb-2">Ocean Vibes</h3>
                  <p className="text-white/80">Calm and refreshing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-600 mb-2">10K+</div>
              <div className="text-gray-600">Templates Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-600 mb-2">5K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-600 mb-2">50K+</div>
              <div className="text-gray-600">Designs Made</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                CardCraft
              </span>
            </div>
            <p className="text-gray-600">
              © 2024 CardCraft. Create beautiful cards effortlessly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
