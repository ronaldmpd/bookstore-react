import { element } from 'prop-types';

const Content = (props) => {
  const { children } = props;
  return <main className="container">{children}</main>;
};

Content.propTypes = {
  children: element,
};

export default Content;
