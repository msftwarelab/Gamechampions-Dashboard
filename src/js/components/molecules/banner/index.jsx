import React from "react";
import { Carousel } from "react-responsive-carousel";
import { styled, media, withTheme } from "~theme";
import { Heading, Link } from "~components/atoms";
import CoveringImage from "./coveringImage";

const Banner = ({
  title = null,
  imageUrl = null,
  bannerTheme = null,
  theme,
  banners,
  websiteUrl,
  rotatingBanners,
  selectedLanguage
}) => {
  const currentBannerTheme = bannerTheme || (theme && theme.bannerTheme) || {};
  const { headerTheme = {} } = currentBannerTheme;

  const handleBannerClick = bannerIndex => {
    const url = banners[bannerIndex].link.isInternal
      ? `${websiteUrl}${banners[bannerIndex].link.url}`
      : banners[bannerIndex].link.url;
    window.open(
      url,
      banners[bannerIndex].link.isNewWindow ? "_blank" : "_self"
    );
  };

  return (
    <BannerStyle>
      {rotatingBanners?.toJS().length > 0 ? (
        <Carousel
          dynamicHeight={true}
          showThumbs={false}
          swipeable
          emulateTouch
          infiniteLoop
          autoPlay
          showStatus={false}
          showIndicators={false}
          stopOnHover
          interval={5000}
          onClickItem={handleBannerClick}
        >
          {rotatingBanners.map(rotatingBanner => (
            <a
              href={rotatingBanner?.get("link")?.get("url")}
              key={rotatingBanner?.get("id")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CarouselImageWrapper>
                <CarouselBannerImage
                  src={rotatingBanner?.get("thumbnail")?.get("imageUrl")}
                  alt={`${rotatingBanner
                    ?.get("thumbnail")
                    ?.get("title")} banner`}
                />

                {rotatingBanner?.get("title") && (
                  <Heading {...headerTheme} className="legend">
                    {rotatingBanner?.get("title")}
                  </Heading>
                )}
              </CarouselImageWrapper>
            </a>
          ))}
        </Carousel>
      ) : (
        <>
          {imageUrl && (
            <CoveringImage
              src={imageUrl}
              alt={`${title} banner`}
              title={`${title} banner`}
            />
          )}
        </>
      )}
    </BannerStyle>
  );
};

const BannerStyle = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 10em;
  max-height: 10em;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0.5rem;

  ${media.md`
  min-height: 15em;
  max-height: 15em;
`};
`;

const CarouselImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 15em;
  cursor: pointer;
`;

const CarouselBannerImage = styled.img`
  width: 100%;
  height: inherit !important;
  min-height: 10em;
  object-fit: contain;
`;

export default withTheme(Banner);
