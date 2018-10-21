import './Help.css'
import React from 'react'
import Markdown from '../Markdown/Markdown.jsx'

export default function Help () {
  return (
    <table className="Help">
      <thead>
        <tr>
          <th>Type</th>
          <th className="second-example">Or</th>
          <th>&hellip; to Get</th>
        </tr>
      </thead>
      <tbody>
        <tr>                        
          <td className="preformatted">*Italic*</td>
          <td className="preformatted second-example">_Italic_</td>
          <td>
            <Markdown>
              *Italic*
            </Markdown>
          </td>
        </tr>
        <tr>                        
          <td className="preformatted">**Bold**</td>
          <td className="preformatted second-example">__Bold__</td>
          <td>
            <Markdown>
              **Bold**
            </Markdown>
          </td>
        </tr>
        <tr>
          <td className="preformatted">
            # Heading 1
          </td>
          <td className="preformatted second-example">
            Heading 1<br/>
            =========
          </td>
          <td>
            <Markdown>
              # Heading 1
            </Markdown>
          </td>
        </tr>
        <tr>
          <td className="preformatted">
            ## Heading 2
          </td>
          <td className="preformatted second-example">
            Heading 2<br/>
            ---------
          </td>
          <td>
            <Markdown>
              ## Heading 2
            </Markdown>
          </td>
        </tr>
        <tr>                        
          <td className="preformatted">
            [Link](http://a.com)
          </td>
          <td className="preformatted second-example">
            [Link][1]<br/>
            &#8942;<br/>
            [1]: http://b.org
          </td>
          <td>
            <Markdown>
              [Link](http://a.com)
            </Markdown>
          </td>
        </tr>
        <tr>
          <td className="preformatted">
            ![Image](http://url/a.png)
          </td>
          <td className="preformatted second-example">
            ![Image][1]<br/>
            &#8942;<br/>
            [1]: http://url/b.jpg
          </td>
          <td>
            <Markdown>
              ![Image](https://www.easyicon.net/api/resizeApi.php?id=1157747&size=16)
            </Markdown>
          </td>
        </tr>
        <tr>
          <td className="preformatted">
            &gt; Blockquote
          </td>
          <td className="preformatted second-example">
            &nbsp;
          </td>
          <td>
            <Markdown>
              > Blockquote
            </Markdown>
          </td>
        </tr>
        <tr>
          <td className="preformatted">
            <p>
              * List<br/>
              * List<br/>
              * List
            </p>
          </td>
          <td className="preformatted second-example">
            <p>
              - List<br/>
              - List<br/>
              - List<br/>
            </p>
          </td>
          <td>
            <Markdown markdown={"* List\n* List\n* List"} />
          </td>
        </tr>
        <tr>
          <td className="preformatted">
            <p>
              1. One<br/>
              2. Two<br/>
              3. Three
            </p>
          </td>
          <td className="preformatted second-example">
            <p>
              1) One<br/>
              2) Two<br/>
              3) Three
            </p>
          </td>
          <td>
            <Markdown markdown={"1. One\n2. Two\n3. Three"} />
          </td>
        </tr>
        <tr>
          <td className="preformatted">
            Horizontal Rule<br/>
            <br/>
            ---
          </td>
          <td className="preformatted second-example">
            Horizontal Rule<br/>
            <br/>
            ***
          </td>
          <td>
            <Markdown markdown={"Horizontal Rule\n\n---"} />
          </td>
        </tr>
        <tr>                        
          <td className="preformatted">
            `Inline code` with backticks
          </td>
          <td className="preformatted second-example">
            &nbsp;
          </td>
          <td>
            <Markdown>
              `Inline code` with backticks
            </Markdown>
          </td>
        </tr>
        <tr>
          <td className="preformatted">
            ```<br/>
            # code block<br/>
            print '3 backticks or'<br/> 
            print 'indent 4 spaces'<br/>                            
            ```
          </td>
          <td className="preformatted second-example">
            <span className="spaces">····</span># code block<br/> 
            <span className="spaces">····</span>print '3 backticks or'<br/>
            <span className="spaces">····</span>print 'indent 4 spaces'
          </td>
          <td>
            <Markdown markdown={"```\n# code block\nprint '3 backticks or'\nprint 'indent 4 spaces'\n```"} />
          </td>
        </tr>                    
      </tbody>
    </table>
  )
}
