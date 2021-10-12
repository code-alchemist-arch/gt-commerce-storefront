import React, { ChangeEvent, useContext, useRef, useState } from "react";
import {
  InstantSearchWrapper,
  SearchResultsWrapper,
  SearchResults,
  Suggestions,
  Results,
  SearchTitle,
  NotFoundWrapper,
  SuggestionsList,
  SuggestionsItem,
  BackMobileButton,
  ResultsContainer,
  InstantSearchHeader,
} from "./InstantSearch.style";

import {
  InstantSearch as TypesenseInstantSearch,
  SearchBox,
  Configure,
  connectStateResults,
  connectSearchBox,
} from "react-instantsearch-dom";
import InstantSearchResult from "./InstantSearchResult";

import { useAppDispatch } from "contexts/app/app.provider";
import { TouchScrollable } from "react-scrolllock";
import { TypesenseContext } from "contexts/typesense/typesense.context";
import Image from "next/image";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import CloseIcon from "../../assets/icons/CloseIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import { defaultTheme } from "../../site-settings/site-theme/default";
import { useOutsideAlerter } from "../../utils/useOutsideAlerter";
import { GTInstantSearchBox } from "components/@gt-components/gt-search-box";

const NotFoundComponent = () => (
  <NotFoundWrapper>
    <Image
      src="/images/empty-search.png"
      width={154}
      height={154}
      priority
      quality={95}
      alt="empty search"
    />
    <span className="title">Nothing Found!</span>
    <div className="message">
      <p>Sorry, we couldn’t find any matches for your search.</p>
      <p>
        Try adjusting your search or filter options to find what you’re looking
        for.
      </p>
    </div>
  </NotFoundWrapper>
);

const SearchResultComponent = ({
  searchState,
  searching,
  searchResults,
  searchResultRef,
  className,
  onLinkClick,
}) => {
  // return searchResults && searchResults.nbHits !== 0 ? 'cloned' : <NotFoundComponent />;
  // if (searching) return <LoadingSearch>Loading...</LoadingSearch>;
  const searchLength = searchState.query?.length;

  if (!searchResults || searchLength === undefined || searchLength < 1)
    return <></>;

  const collectionsMap = new Map();

  if (searchResults.nbHits) {
    searchResults.hits?.forEach((hit) => {
      hit.collection_slugs?.forEach((slug) => {
        if (!collectionsMap.has(slug)) {
          collectionsMap.set(slug, slug);
        }
      });
    });
  }
  const collectionArray = Array.from(collectionsMap.values());

  return (
    <SearchResultsWrapper>
      <SearchResults ref={searchResultRef} className={className}>
        {searchResults && searchResults.nbHits === 0 ? (
          <NotFoundComponent />
        ) : (
          <>
            <Suggestions>
              <SearchTitle>Collections</SearchTitle>
              {!!collectionArray.length && (
                <SuggestionsList>
                  {collectionArray.map((i) => (
                    <SuggestionsItem key={i}>
                      <a href={`/collections/${i}`}>{i}</a>
                    </SuggestionsItem>
                  ))}
                </SuggestionsList>
              )}
            </Suggestions>
            <Results>
              <SearchTitle>Products</SearchTitle>

              <ResultsContainer>
                {searchResults.hits.map((hit) => (
                  <InstantSearchResult
                    key={hit.objectID}
                    hit={hit}
                    onClick={onLinkClick}
                  />
                ))}
              </ResultsContainer>
            </Results>
          </>
        )}
      </SearchResults>
    </SearchResultsWrapper>
  );
};

const ConnectedResults = connectStateResults(SearchResultComponent);

const CustomSearchBox = connectSearchBox(GTInstantSearchBox);

type Props = {
  mobile?: boolean;
  openResults?: boolean;
  showSearchBox?: boolean;
  centered?: boolean;
  onShowResult?: () => void;
  onHideResult?: () => void;
  isSticky?: boolean;
};

const InstantSearch: React.FC<Props> = ({
  mobile = false,
  openResults,
  isSticky = false,
  showSearchBox = true,
  centered,
  onShowResult,
  onHideResult,
}: Props) => {
  const {
    state: { client, defaultIndexName },
  } = useContext(TypesenseContext);
  const dispatch = useAppDispatch();
  const searchBoxRef = useRef(null);
  const [showResults, setShowResults] = useState(true);
  const searchResultRef = useRef(null);
  const [isOutside, setIsOutside] = useOutsideAlerter(searchResultRef);
  // const [mounted, setMounted] = useState(false);

  // React.useEffect(() => setMounted(true), []);
  React.useEffect(() => {
    if (openResults !== undefined) {
      openResults ? setShowResults(true) : setShowResults(false);
    }
  }, [openResults]);

  React.useEffect(() => {
    if (showResults !== undefined) {
      if (showResults) {
        onShowResult && onShowResult();
        if (mobile) {
          searchBoxRef?.current?.focus();
          // (document.getElementsByClassName(
          //   "ais-SearchBox-input"
          // )[0] as HTMLElement).focus();
          // dispatch({ type: 'SET_BODY_SCROLL', payload: false });
        }
      } else {
        onHideResult && onHideResult();
      }
    }
  }, [showResults]);

  React.useEffect(() => {
    if (isOutside) {
      setShowResults(false);
    }
  }, [isOutside]);

  const handleFocus = (event) => {
    // event.stopPropagation();
    if (!showResults) {
      setShowResults(true);
      (setIsOutside as React.Dispatch<React.SetStateAction<boolean>>)(false);
    }
  };

  const handleBackClick = () => {
    // (document.getElementsByClassName(
    //   "ais-SearchBox-reset"
    // )[0] as HTMLElement).click();
    // (document.getElementsByClassName(
    //   "ais-SearchBox-input"
    // )[0] as HTMLElement).blur();
    setShowResults(false);
  };

  return (
    // <TouchScrollable>
    <InstantSearchWrapper
      className={`${mobile ? "mobile" : ""} ${showResults ? "active" : ""}`}
      centered={centered}
    >
      <TypesenseInstantSearch
        searchClient={client}
        indexName={defaultIndexName}
      >
        <InstantSearchHeader>
          {showResults && mobile && (
            <BackMobileButton onClick={handleBackClick}>
              <ArrowLeft color={defaultTheme.menu.color} />
            </BackMobileButton>
          )}
          <Configure hitsPerPage={24} />
          {/* {showSearchBox && (
            <SearchBox
              translations={{
                placeholder: "Search wines, spirits and more...",
              }}
              submit={<SearchIcon width={24} height={24} />}
              reset={<CloseIcon />}
              onClick={handleFocus}
              onKeyDown={(event) => {
                if (event.keyCode === 9 || event.keyCode === 27) {
                  setShowResults(false);
                }
              }}
              onChange={(event) => {
                if (!mobile) {
                  setShowResults(!!event.target.value);
                }
              }}
            />
          )} */}
          <CustomSearchBox
            placeholder="Search wines, spirits and more..."
            isSticky={isSticky}
            ref={searchBoxRef}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (!mobile) {
                setShowResults(!!event.target.value);
              }
            }}
          />
        </InstantSearchHeader>

        {showResults && (
          <ConnectedResults
            searchResultRef={searchResultRef}
            className={`${mobile ? "mobile" : ""}`}
            onLinkClick={handleBackClick}
          />
        )}
      </TypesenseInstantSearch>
    </InstantSearchWrapper>
    // </TouchScrollable>
  );
};

export default React.memo(InstantSearch);
