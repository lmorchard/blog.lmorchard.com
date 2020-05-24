const { html } = require("../lib/html");
const layoutPage = require("./layoutPage");

const omitTags = ["asides", "entries", "Header"];
const allMonths = {
  "01": "jan",
  "02": "feb",
  "03": "mar",
  "04": "apr",
  "05": "may",
  "06": "jun",
  "07": "jul",
  "08": "aug",
  "09": "sep",
  "10": "oct",
  "11": "nov",
  "12": "dec",
};

module.exports = ({ site = {}, page = {}, posts }) => {
  const tagsWithCounts = posts.reduce(
    (acc, { tags = [] }) =>
      tags.reduce(
        (acc, tag) => ({
          ...acc,
          [tag]: 1 + (acc[tag] || 0),
        }),
        acc
      ),
    {}
  );
  
  const datesWithCounts = posts.reduce((acc, { year, month }) => {
    const out = { ...acc };
    if (!out[year]) out[year] = {};
    if (!out[year][month]) out[year][month] = 0;
    out[year][month]++;
    return out;
  }, {});

  return layoutPage(
    {
      site,
      page,
    },
    html`
      <section class="archive">
        <h2>Archives</h2>
        <p>Looking for something from the back catalog?</p>
        <p>
          Feel free to peruse this
          <a href="${site.baseurl}/all.html">huge list of all my posts</a>. Someday, I might
          build a local search engine.
        </p>

        <h3>Tags</h3>
        <p>Here are some of the topics I've written about:</p>

        <ul class="tags">
          ${Object.entries(tagsWithCounts)
            .filter(([tag, count]) => count > 3 && !omitTags.includes(tag))
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 50)
            .map(
              ([tag, count]) => html`
                <li class="tag">
                  <a href="${site.baseurl}/tag/${tag}/">
                    <i class="fa fa-tag"></i>
                    <span class="name">${tag}</span>
                    <span class="count">(${count})</span>
                  </a>
                </li>
              `
            )}
        </ul>

        <h3>Time</h3>
        <p>Here's how my writing here stacks up over time:</p>

        <ul class="years">
          ${Object.entries(datesWithCounts)
            .sort(([yearA], [yearB]) => yearB - yearA)
            .map(
              ([year, months]) => html`
                <li class="year">
                  <a href="${site.baseUrl}/${year}/">
                    <span class="year-label">${year}</span>
                  </a>
                  <ul class="months">
                    ${Object.entries(allMonths)
                      .sort(([monthA], [monthB]) => monthA - monthB)
                      .map(([month, monthName]) =>
                        months[month]
                          ? html`
                              <li class="month">
                                <a
                                  class="month-container"
                                  href="${site.baseUrl}/${year}/${month}/"
                                >
                                  <span class="month-label">${monthName}</span>
                                  <span class="month-count"
                                    >(${months[month]})</span
                                  >
                                </a>
                              </li>
                            `
                          : html`
                              <li class="month no-posts">
                                <span class="month-container">
                                  <span class="month-label">${monthName}</span>
                                  <span class="month-count">(0)</span>
                                </span>
                              </li>
                            `
                      )}
                  </ul>
                </li>
              `
            )}
        </ul>
      </section>
    `
  );
};
