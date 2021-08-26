import { Tooltip, Toast, Popover, Alert } from 'bootstrap';
import inlineForm from './modules/inlineForm';
import productVariant from './modules/productVariant';

[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl);
});

import feather from 'feather-icons';
feather.replace();

import GLightbox from 'glightbox';
GLightbox({
    selector: '.glightbox',
});

inlineForm();
productVariant();
