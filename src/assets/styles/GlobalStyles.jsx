import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .animate-fade-in {
    animation: fadeIn var(--transition-base) ease-in;
  }

  .animate-slide-up {
    animation: slideUp var(--transition-base) ease-out;
  }

  .animate-slide-down {
    animation: slideDown var(--transition-base) ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export default GlobalStyles;