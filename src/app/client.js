'use strict';

import rest from 'rest';
import defaultRequest from 'rest/interceptor/defaultRequest';
import mime from 'rest/interceptor/mime';
import uriTemplateInterceptor from './api/uriTemplateInterceptor';
import errorCode from 'rest/interceptor/errorCode';
import baseRegistry from 'rest/mime/registry';

import uriListConverter from './api/uriListConverter';
import applicationHal from 'rest/mime/type/application/hal';

var registry = baseRegistry.child();

registry.register('text/uri-list', uriListConverter);
registry.register('application/hal+json', applicationHal);

export default rest
	.wrap(mime, { registry: registry })
	.wrap(uriTemplateInterceptor)
	.wrap(errorCode)
	.wrap(defaultRequest, { headers: { 'Accept': 'application/hal+json' }});
