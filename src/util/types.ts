export interface InputTextTypes {
    type: 'text' | 'email' | 'number' | 'search' | 'password'
    formenctype: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
    formmethod: 'post' | 'get'
    formtarget: '_self' | '_blank' | '_parent' | '_top'
    autocomplete:
        | 'on'
        | 'off'
        | 'name'
        | 'given-name'
        | 'family-name'
        | 'additional-name'
        | 'honorific-prefix'
        | 'honorific-suffix'
        | 'nickname'
        | 'email'
        | 'username'
        | 'new-password'
        | 'current-password'
        | 'organization-title'
        | 'organization'
        | 'street-address'
        | 'address-line1'
        | 'address-line2'
        | 'address-line3'
        | 'address-level4'
        | 'address-level3'
        | 'address-level2'
        | 'address-level1'
        | 'country'
        | 'country-name'
        | 'postal-code'
        | 'cc-name'
        | 'cc-given-name'
        | 'cc-additional-name'
        | 'cc-family-name'
        | 'cc-number'
        | 'cc-exp'
        | 'cc-exp-month'
        | 'cc-exp-year'
        | 'cc-csc'
        | 'cc-type'
        | 'transaction-currency'
        | 'transaction-amount'
        | 'language'
        | 'bday-day'
        | 'bday-month'
        | 'bday-year'
        | 'sex'
        | 'tel'
        | 'url'
        | 'photo'
}

export type StrOrRegex = string | object
