import ChapterList from "../components/ChapterList";
import ChapterOverview from "../components/ChapterOverview";
import Breadcrumb from '../components/Breadcrumb';


const BasicsOfEnglish = () => {
  const breadcrumbPath = [
    { label: 'Home', to: '/' },
    { label: 'Basics of English' } // no `to` means it's the current page
  ];
  return (
    <div>
            <Breadcrumb path={breadcrumbPath} />

      <ChapterOverview
        icon={`${import.meta.env.BASE_URL}assets/icons/book.svg`}

        title="Basics of English"
        description="Master foundational English skills."
        onStart={() => console.log("Start Basics clicked")}
      />

      <ChapterList />
    </div>
  );
};

export default BasicsOfEnglish;
