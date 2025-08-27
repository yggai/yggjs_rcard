import { Card } from '../components/Card';
import { CardHeader } from '../components/Card/CardHeader';
import { CardContent } from '../components/Card/CardContent';
import { CardActions } from '../components/Card/CardActions';
import { CardMedia } from '../components/Card/CardMedia';
import { useCardVisibility } from '../hooks/useCardVisibility';
import './CardExamples.css';

const CardExamples = () => {
  const { ref: visibilityRef, isVisible } = useCardVisibility();

  return (
    <div className="card-examples">
      <div className="examples-header">
        <h1 className="examples-title">
          <span className="title-card">Card</span>
          <span className="title-examples">Examples</span>
        </h1>
        <p className="examples-subtitle">
          Explore our powerful and customizable card components
        </p>
      </div>

      <div className="examples-grid">
        {/* Basic Card */}
        <section className="example-section">
          <h2>Basic Card</h2>
          <div className="example-demo">
            <Card>
              <p>This is a basic card with default styling.</p>
            </Card>
          </div>
          <div className="example-code">
            <pre>
              <code>{`<Card>
  <p>This is a basic card with default styling.</p>
</Card>`}</code>
            </pre>
          </div>
        </section>

        {/* Card Sizes */}
        <section className="example-section">
          <h2>Card Sizes</h2>
          <div className="example-demo">
            <div className="size-demo">
              <Card size="sm">
                <p>Small Card</p>
              </Card>
              <Card size="md">
                <p>Medium Card</p>
              </Card>
              <Card size="lg">
                <p>Large Card</p>
              </Card>
            </div>
          </div>
          <div className="example-code">
            <pre>
              <code>{`<Card size="sm">Small Card</Card>
<Card size="md">Medium Card</Card>
<Card size="lg">Large Card</Card>`}</code>
            </pre>
          </div>
        </section>

        {/* Card Variants */}
        <section className="example-section">
          <h2>Card Variants</h2>
          <div className="example-demo">
            <div className="variant-demo">
              <Card variant="filled">
                <p>Filled Card</p>
              </Card>
              <Card variant="outlined">
                <p>Outlined Card</p>
              </Card>
              <Card variant="elevated">
                <p>Elevated Card</p>
              </Card>
              <Card variant="ghost">
                <p>Ghost Card</p>
              </Card>
            </div>
          </div>
          <div className="example-code">
            <pre>
              <code>{`<Card variant="filled">Filled Card</Card>
<Card variant="outlined">Outlined Card</Card>
<Card variant="elevated">Elevated Card</Card>
<Card variant="ghost">Ghost Card</Card>`}</code>
            </pre>
          </div>
        </section>

        {/* Interactive Cards */}
        <section className="example-section">
          <h2>Interactive Cards</h2>
          <div className="example-demo">
            <div className="interactive-demo">
              <Card clickable onClick={() => alert('Card clicked!')}>
                <p>Clickable Card</p>
              </Card>
              <Card selected>
                <p>Selected Card</p>
              </Card>
              <Card disabled>
                <p>Disabled Card</p>
              </Card>
            </div>
          </div>
          <div className="example-code">
            <pre>
              <code>{`<Card clickable onClick={() => alert('Clicked!')}>
  <p>Clickable Card</p>
</Card>
<Card selected>
  <p>Selected Card</p>
</Card>
<Card disabled>
  <p>Disabled Card</p>
</Card>`}</code>
            </pre>
          </div>
        </section>

        {/* Card with Components */}
        <section className="example-section">
          <h2>Card with Components</h2>
          <div className="example-demo">
            <Card>
              <CardHeader
                title="Card Title"
                subtitle="Card Subtitle"
                action={<button>Action</button>}
              />
              <CardMedia
                image="https://via.placeholder.com/300x200"
                alt="Placeholder image"
                height="200px"
              />
              <CardContent>
                <p>
                  This is the card content area. You can put any content here
                  including text, images, or other components.
                </p>
              </CardContent>
              <CardActions align="right">
                <button>Cancel</button>
                <button>Save</button>
              </CardActions>
            </Card>
          </div>
          <div className="example-code">
            <pre>
              <code>{`<Card>
  <CardHeader
    title="Card Title"
    subtitle="Card Subtitle"
    action={<button>Action</button>}
  />
  <CardMedia
    image="https://via.placeholder.com/300x200"
    alt="Placeholder image"
    height="200px"
  />
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
  <CardActions align="right">
    <button>Cancel</button>
    <button>Save</button>
  </CardActions>
</Card>`}</code>
            </pre>
          </div>
        </section>

        {/* Loading State */}
        <section className="example-section">
          <h2>Loading State</h2>
          <div className="example-demo">
            <Card loading>
              <p>This content is hidden while loading</p>
            </Card>
          </div>
          <div className="example-code">
            <pre>
              <code>{`<Card loading>
  <p>This content is hidden while loading</p>
</Card>`}</code>
            </pre>
          </div>
        </section>

        {/* Visibility Hook Demo */}
        <section className="example-section" ref={visibilityRef}>
          <h2>Visibility Hook Demo</h2>
          <div className="example-demo">
            <Card className={isVisible ? 'visible-card' : 'hidden-card'}>
              <p>
                This card uses the useCardVisibility hook.{' '}
                {isVisible ? 'Currently visible!' : 'Not visible yet.'}
              </p>
            </Card>
          </div>
          <div className="example-code">
            <pre>
              <code>{`const { ref, isVisible } = useCardVisibility();

<Card ref={ref} className={isVisible ? 'visible' : 'hidden'}>
  <p>Visibility: {isVisible ? 'Visible' : 'Hidden'}</p>
</Card>`}</code>
            </pre>
          </div>
        </section>
      </div>

      <div className="examples-footer">
        <p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="back-link"
          >
            ← Back to Tech Navigator
          </a>
        </p>
      </div>
    </div>
  );
};

export default CardExamples;
