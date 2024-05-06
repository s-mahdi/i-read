import * as React from 'react';

function VerseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 44 44" fill="none" {...props}>
      <path
        d="M22 2l4.141 4.545L32 4.68l1.314 6.007L39.32 12l-1.866 5.859L42 22l-4.545 4.141L39.32 32l-6.007 1.314L32 39.32l-5.859-1.866L22 42l-4.141-4.545L12 39.32l-1.314-6.007L4.68 32l1.866-5.859L2 22l4.545-4.141L4.68 12l6.007-1.314L12 4.68l5.859 1.866L22 2z"
        stroke="#32B7C5"
        strokeWidth={2}
      />
    </svg>
  );
}

const MemoVerseIcon = React.memo(VerseIcon);
export default MemoVerseIcon;
