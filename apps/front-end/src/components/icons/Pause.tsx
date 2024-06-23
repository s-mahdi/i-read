import * as React from "react";

function Pause(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

const MemoPause = React.memo(Pause);
export default MemoPause;
