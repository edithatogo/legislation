# Markdown Style Guide

Use CommonMark as the portable syntax baseline. Use GitHub Flavored Markdown
only when the target project explicitly supports it.

## Structure

- Use one level-one heading (`#`) for the document title.
- Use ATX headings (`## Heading`) and increase heading levels one at a time.
- Put blank lines around headings, lists, block quotes, and fenced code blocks.
- Keep sections focused and use descriptive heading text.
- Use a table only when rows and columns clarify a real comparison.

## Text and Links

- Write concise prose in complete sentences unless a fragment is clearer in a list.
- Use descriptive link labels; avoid labels such as "click here."
- Use relative links for repository-local content and verify that targets exist.
- Add meaningful alternative text to informative images; use empty alternative
  text only for decorative images.
- Avoid raw HTML unless Markdown cannot express the required result.

## Lists and Code

- Use `-` for unordered lists and `1.` for ordered lists unless the project says otherwise.
- Keep list-marker indentation consistent and separate nested blocks clearly.
- Use backticks for identifiers, commands, filenames, and short code fragments.
- Use fenced code blocks with a language identifier when one is available.
- Never place secrets, credentials, or machine-specific private paths in examples.

## Formatting and Validation

- Follow the repository's formatter, markdownlint configuration, and line-wrapping policy.
- Remove trailing whitespace except where an intentional hard line break is required.
- Prefer semantic line breaks or the repository's configured width; do not reflow
  tables, generated content, or text where wrapping changes meaning.
- Preview rendered output and check headings, lists, code blocks, images, and links.

_Authority: [CommonMark specification](https://spec.commonmark.org/current/)._
