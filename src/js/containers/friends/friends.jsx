import React, { Fragment } from "react";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { withRouter } from "react-router-dom";

import { selectFriends, selectIsLoading, selectPagination } from "./reducer";
import { fetchFriends, setFriend, setFriends } from "./actions";
import FriendsList from "~components/custom/friends/friendsList";
import FriendsTitle from "~components/custom/friends/friendsTitle";
import DynamicForm from "~components/molecules/dynamicForm";
import { Loader, Wrapper } from "~components/atoms";
import {
  getFormFields,
  DEBOUNCE_TIME,
  INTERVAL_TIME,
  ONLINE_PLAYERS_PAGE_SIZE_VALUE
} from "./constants";
import { selectSelectedLanguage } from "~containers/multiLanguage/reducer";

class Friends extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: null,
      page: 1,
      isLoading: true
    };

    this.handleFriendClick = this.handleFriendClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.friendInterval = this.friendInterval.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.debouncedSearchChange = debounce(this.onSearchChange, DEBOUNCE_TIME);
  }

  handleFriendClick(friend = {}) {
    const { history, selectedLanguage } = this.props;
    if (friend.toJS) {
      friend = friend.toJS();
    }
    let { id } = friend;
    history.push(`/${selectedLanguage}/player-details/${id}`);
  }

  friendInterval() {
    const { onLoadFriends, friends } = this.props;
    const { page } = this.state;

    const selectedFriend = friends && friends.find(x => x.get("isSelected"));
    const selectedFriendId = selectedFriend && selectedFriend.get("id");
    onLoadFriends({
      selectedFriendId,
      page,
      pageSize: ONLINE_PLAYERS_PAGE_SIZE_VALUE
    }).then(() => this.setState({ isLoading: false }));
  }

  handleScroll(e) {
    let { page, isLoading } = this.state;
    const { pagination, friends } = this.props;
    let itemCount = pagination && pagination.get("itemCount");
    let limitReached = itemCount && friends.size == itemCount;

    if (
      !isLoading &&
      !limitReached &&
      e.target.scrollTop + e.target.clientHeight + 1 >= e.target.scrollHeight
    ) {
      this.setState({ page: ++page, isLoading: true }, () =>
        this.friendInterval()
      );
    }
  }

  onSearchChange(textToSearch) {
    const { friends } = this.props;

    let search = friends.filter(
      f =>
        f
          .get("userName")
          .toLowerCase()
          .indexOf(textToSearch.toLowerCase()) !== -1
    );
    this.setState({
      search
    });
  }

  componentDidMount() {
    const { onLoadFriends } = this.props;

    onLoadFriends({
      page: 1,
      pageSize: ONLINE_PLAYERS_PAGE_SIZE_VALUE
    }).then(() => this.setState({ isLoading: false }));
    this.interval = setInterval(() => this.friendInterval(), INTERVAL_TIME);
  }
  componentWillUnmount() {
    const { onSetFriends } = this.props;
    clearInterval(this.interval);
    onSetFriends([]);
  }

  render() {
    const { friends, selectedLanguage } = this.props;

    return (
      <Fragment>
        <Wrapper className="friends__list__header">
          <FriendsTitle selectedLanguage={selectedLanguage} />
          <DynamicForm
            formFields={getFormFields({
              onSearchChange: this.debouncedSearchChange
            })}
            displayButtons={false}
          />
        </Wrapper>
        {friends && friends.size ? (
          <FriendsList
            friends={this.state.search ? this.state.search : friends}
            onFriendClick={this.handleFriendClick}
            handleScroll={this.handleScroll}
            isLoading={this.state.isLoading}
          />
        ) : (
          <Loader
            isLoading={true}
            height="10em"
            alignItems="center"
            scale="4rem"
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  friends: selectFriends(state),
  isLoading: selectIsLoading(state),
  selectedLanguage: selectSelectedLanguage(state),
  pagination: selectPagination(state)
});

const mapDispatchToProps = dispatch => ({
  onLoadFriends: data => dispatch(fetchFriends(data)),
  onSetFriend: data => dispatch(setFriend(data)),
  onSetFriends: data => dispatch(setFriends(data))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Friends)
);
