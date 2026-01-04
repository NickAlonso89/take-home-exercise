interface DisclaimerProps {
  children: React.ReactNode;
}

/**
 * Disclaimer component
 *
 * Styled disclaimer banner typically displayed at the bottom
 * of pages to show legal disclaimers or notices.
 *
 * @param props - DisclaimerProps containing children
 */
function Disclaimer({ children }: DisclaimerProps) {
  return (
    <div className="text-xs font-normal text-white bg-brand-dark-disclaimer leading-[2.5rem] text-center">
      <p className="text-brand-gray">{children}</p>
    </div>
  );
}

export default Disclaimer;
