const SIZES = {
  small : 'tw-text-sm tw-min-h-[24px] tw-min-w-[40px]',
  medium: 'tw-text-base tw-min-h-[32px] tw-min-w-[40px]',
  large : 'tw-text-lg tw-min-h-[40px] tw-min-w-[50px]',
}

const COLORS = {
  success: 'tw-bg-blue-500 hover:tw-bg-blue-600',
  cancel: 'tw-bg-gray-400 hover:tw-bg-gray-500',
  warn: 'tw-bg-red-500 hover:tw-bg-red-600',
}

const CustomButton = ({ size,color, text, onClick }) => {

  const btnSize = size ? SIZES[size] : SIZES.medium;
  const btnColor = color ? COLORS[color] : COLORS.cancel;
  const handleReferencedFunction = onClick ? onClick : () => console.warn("undefined or null Error Handle Btn Click");
  const defaultBtnStyle = 'tw-text-white tw-outline-none tw-border-none tw-font-semibold tw-rounded';

  return (
    <button className={`${defaultBtnStyle} ${btnSize} ${btnColor}`} onClick={handleReferencedFunction}>{text}</button>
  )
}


export default CustomButton;