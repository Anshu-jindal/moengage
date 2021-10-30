import React from "react";

export default function NotFound() {
  return (
    <div>
      {
        (window.location.href =
          "https://api.aniapi.com/v1/oauth?response_type=token&client_id=38dbd79d-25ed-481a-928a-cc2821e93876&redirect_uri=http://localhost:3000/search&state=cdnvkjfkjvnjfnvnj")
      }
    </div>
  );
}
