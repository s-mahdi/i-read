export const NavbarActions = ({
  onBackClick,
  onFinishClick,
}: {
  onBackClick: () => void;
  onFinishClick: () => void;
}) => (
  <>
    <button
      className="text-white border border-white px-2 py-1 rounded bg-inherit hover:bg-white hover:text-primary transition-colors duration-300"
      onClick={onBackClick}
    >
      بازگشت
    </button>
    <button
      className="text-white border border-white px-2 py-1 rounded bg-inherit hover:bg-white hover:text-primary transition-colors duration-300"
      onClick={onFinishClick}
    >
      اتمام قرائت
    </button>
  </>
);
