import { useState } from 'react';
import './App.css';

interface WebsiteLink {
  name: string;
  url: string;
  description: string;
  icon: string;
}

interface Category {
  title: string;
  links: WebsiteLink[];
}

const websiteData: Category[] = [
  {
    title: 'Development Tools',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com',
        description: 'Code hosting and collaboration',
        icon: '🐱',
      },
      {
        name: 'VS Code',
        url: 'https://code.visualstudio.com',
        description: 'Free code editor',
        icon: '💻',
      },
      {
        name: 'GitLab',
        url: 'https://gitlab.com',
        description: 'DevOps platform',
        icon: '🦊',
      },
      {
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com',
        description: 'Developer Q&A community',
        icon: '📚',
      },
    ],
  },
  {
    title: 'Frontend Frameworks',
    links: [
      {
        name: 'React',
        url: 'https://react.dev',
        description: 'JavaScript library for UIs',
        icon: '⚛️',
      },
      {
        name: 'Vue.js',
        url: 'https://vuejs.org',
        description: 'Progressive framework',
        icon: '💚',
      },
      {
        name: 'Angular',
        url: 'https://angular.io',
        description: 'Platform for web apps',
        icon: '🅰️',
      },
      {
        name: 'Next.js',
        url: 'https://nextjs.org',
        description: 'React production framework',
        icon: '▲',
      },
    ],
  },
  {
    title: 'Design Tools',
    links: [
      {
        name: 'Figma',
        url: 'https://figma.com',
        description: 'Collaborative design tool',
        icon: '🎨',
      },
      {
        name: 'Adobe XD',
        url: 'https://adobe.com/products/xd',
        description: 'UI/UX design platform',
        icon: '💎',
      },
      {
        name: 'Sketch',
        url: 'https://sketch.com',
        description: 'Digital design toolkit',
        icon: '💰',
      },
      {
        name: 'Dribbble',
        url: 'https://dribbble.com',
        description: 'Design inspiration',
        icon: '🏀',
      },
    ],
  },
  {
    title: 'Cloud Services',
    links: [
      {
        name: 'AWS',
        url: 'https://aws.amazon.com',
        description: 'Amazon cloud platform',
        icon: '☁️',
      },
      {
        name: 'Vercel',
        url: 'https://vercel.com',
        description: 'Frontend deployment',
        icon: '🔺',
      },
      {
        name: 'Netlify',
        url: 'https://netlify.com',
        description: 'Web development platform',
        icon: '🌐',
      },
      {
        name: 'Google Cloud',
        url: 'https://cloud.google.com',
        description: 'Google cloud services',
        icon: '🌩️',
      },
    ],
  },
  {
    title: 'Learning Resources',
    links: [
      {
        name: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        description: 'Web technology docs',
        icon: '📖',
      },
      {
        name: 'freeCodeCamp',
        url: 'https://freecodecamp.org',
        description: 'Free coding education',
        icon: '🔥',
      },
      {
        name: 'Codecademy',
        url: 'https://codecademy.com',
        description: 'Interactive coding courses',
        icon: '🎓',
      },
      {
        name: 'YouTube',
        url: 'https://youtube.com',
        description: 'Video tutorials',
        icon: '📺',
      },
    ],
  },
  {
    title: 'Communities',
    links: [
      {
        name: 'Reddit',
        url: 'https://reddit.com/r/programming',
        description: 'Programming discussions',
        icon: '🤖',
      },
      {
        name: 'Discord',
        url: 'https://discord.com',
        description: 'Developer communities',
        icon: '💬',
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com',
        description: 'Tech news and updates',
        icon: '🐦',
      },
      {
        name: 'Dev.to',
        url: 'https://dev.to',
        description: 'Developer community',
        icon: '👩‍💻',
      },
    ],
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredData = websiteData
    .map((category) => ({
      ...category,
      links: category.links.filter(
        (link) =>
          link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          link.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (category) =>
        category.links.length > 0 &&
        (selectedCategory === null || category.title === selectedCategory)
    );

  return (
    <div className="app">
      <div className="background-grid"></div>

      <header className="header">
        <h1 className="title">
          <span className="title-tech">Tech</span>
          <span className="title-navigator">Navigator</span>
        </h1>
        <p className="subtitle">Your gateway to the developer universe</p>
      </header>

      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search websites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          <button
            className={`filter-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {websiteData.map((category) => (
            <button
              key={category.title}
              className={`filter-btn ${selectedCategory === category.title ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.title)}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      <main className="main-content">
        {filteredData.map((category) => (
          <section key={category.title} className="category-section">
            <h2 className="category-title">{category.title}</h2>
            <div className="links-grid">
              {category.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="link-icon">{link.icon}</div>
                  <div className="link-content">
                    <h3 className="link-name">{link.name}</h3>
                    <p className="link-description">{link.description}</p>
                  </div>
                  <div className="link-arrow">→</div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>

      {filteredData.length === 0 && (
        <div className="no-results">
          <h3>No results found</h3>
          <p>Try adjusting your search terms or category filter</p>
        </div>
      )}

      <footer className="footer">
        <p>&copy; 2024 Tech Navigator - Explore the digital frontier</p>
      </footer>
    </div>
  );
}

export default App;
