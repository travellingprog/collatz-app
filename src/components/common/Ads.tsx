/** An Ezoic ad placeholder, meant to be placed at the bottom of a page */
export function BottomPageAd() {
  const markup = {
    __html: `
      <!-- Ezoic - bottom_of_page - bottom_of_page -->
      <div id="ezoic-pub-ad-placeholder-106"> </div>
      <!-- End Ezoic - bottom_of_page - bottom_of_page -->
    `,
  };

  return <div dangerouslySetInnerHTML={markup} />;
}

/**
 * An Ezoic ad placeholder, meant to be placed at the top of a page,
 * under the site title
 */
export function UnderPageTitleAd() {
  const markup = {
    __html: `
      <!-- Ezoic - under_page_title - under_page_title -->
      <div id="ezoic-pub-ad-placeholder-105"></div>
      <!-- End Ezoic - under_page_title - under_page_title -->
    `,
  };

  return <div dangerouslySetInnerHTML={markup} />;
}
