// @flow

import { Component } from 'react';

import { getProfile, updateProfile } from '../../base/profile';

/**
 * The type of the React {@code Component} props of
 * {@link AbstractSettingsView}.
 */
type Props = {

    /**
     * The current profile object.
     */
    _profile: Object,

    /**
     * The default URL for when there is no custom URL set in the profile.
     */
    _serverURL: string,

    /**
     * Whether {@link AbstractSettingsView} is visible.
     */
    _visible: boolean,

    /**
     * Redux store dispatch function.
     */
    dispatch: Dispatch<*>,

    /**
     * The i18n translate function.
     */
    t: Function
};

/**
 * Base (abstract) class for container component rendering the app settings
 * page.
 *
 * @abstract
 */
export class AbstractSettingsView extends Component<Props> {

    /**
     * Initializes a new {@code AbstractSettingsView} instance.
     *
     * @param {Props} props - The React {@code Component} props to initialize
     * the component.
     */
    constructor(props: Props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onChangeDisplayName = this._onChangeDisplayName.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangeServerURL = this._onChangeServerURL.bind(this);
        this._onStartAudioMutedChange
            = this._onStartAudioMutedChange.bind(this);
        this._onStartVideoMutedChange
            = this._onStartVideoMutedChange.bind(this);
    }

    _onChangeDisplayName: (string) => void;

    /**
     * Handles the display name field value change.
     *
     * @param {string} text - The value typed in the name field.
     * @protected
     * @returns {void}
     */
    _onChangeDisplayName(text) {
        this._updateProfile({
            displayName: text
        });
    }

    _onChangeEmail: (string) => void;

    /**
     * Handles the email field value change.
     *
     * @param {string} text - The value typed in the email field.
     * @protected
     * @returns {void}
     */
    _onChangeEmail(text) {
        this._updateProfile({
            email: text
        });
    }

    _onChangeServerURL: (string) => void;

    /**
     * Handles the server name field value change.
     *
     * @param {string} text - The server URL typed in the server field.
     * @protected
     * @returns {void}
     */
    _onChangeServerURL(text) {
        this._updateProfile({
            serverURL: text
        });
    }

    _onStartAudioMutedChange: (boolean) => void;

    /**
     * Handles the start audio muted change event.
     *
     * @param {boolean} newValue - The new value for the start audio muted
     * option.
     * @protected
     * @returns {void}
     */
    _onStartAudioMutedChange(newValue) {
        this._updateProfile({
            startWithAudioMuted: newValue
        });
    }

    _onStartVideoMutedChange: (boolean) => void;

    /**
     * Handles the start video muted change event.
     *
     * @param {boolean} newValue - The new value for the start video muted
     * option.
     * @protected
     * @returns {void}
     */
    _onStartVideoMutedChange(newValue) {
        this._updateProfile({
            startWithVideoMuted: newValue
        });
    }

    _updateProfile: (Object) => void;

    /**
     * Updates the persisted profile on any change.
     *
     * @param {Object} updateObject - The partial update object for the profile.
     * @private
     * @returns {void}
     */
    _updateProfile(updateObject: Object) {
        this.props.dispatch(updateProfile({
            ...this.props._profile,
            ...updateObject
        }));
    }
}

/**
 * Maps (parts of) the redux state to the React {@code Component} props of
 * {@code AbstractSettingsView}.
 *
 * @param {Object} state - The redux state.
 * @protected
 * @returns {{
 *     _profile: Object,
 *     _serverURL: string,
 *     _visible: boolean
 * }}
 */
export function _mapStateToProps(state: Object) {
    return {
        _profile: getProfile(state),
        _serverURL: state['features/app'].app._getDefaultURL(),
        _visible: state['features/settings'].visible
    };
}
