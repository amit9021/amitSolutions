import '../styles/index.css';
import '../styles/App.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="rtl" dir="rtl">
      <Component {...pageProps} />
    </div>
  );
}