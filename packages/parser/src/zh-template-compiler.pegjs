Program
 = program:Tag {
 	return program;
 }
 
Tag
 = ws
 start:StartTag
 children: (Tag / zh:$zh)*
 end:EndTag
 ws
 {
   if (start.tag !== end.tag) {
     throw Error('开始标签和结束标签不一致')
   }
   
   return {
     ...start,
     children
   }
 }

StartTag
 = "<"
   ws
   component:$zh
   attrList: (
   	 ws
     attrs:Attrs
     ws
     {
       if (attrs.name) {
         return attrs
       }
     }
   )*
   ">" {
     return {
       type: 1,
       tag: component,
       attrs: attrList
     }
   }
   
EndTag
 = "</"
 component:$zh
 ">"
 {
   return {
     tag: component
   }
 }

zh = [\u4e00-\u9fa5]+

Attrs
 = isBind:name_separator ?
 attrName:$zh+
 "="
 quotation_mark
 attrValue:(
   $zh / JSON_text
 )
 quotation_mark {
   if (attrName) {
     let hasVbind = isBind ? true : false
     return {
       isBind: hasVbind,
       name: attrName,
       value: attrValue
     }
   } 
 }
  
JSON_text
  = ws value:value ws { return value; }

begin_array     = ws "[" ws
begin_object    = ws "{" ws
end_array       = ws "]" ws
end_object      = ws "}" ws
name_separator  = ws ":" ws
value_separator = ws "," ws

ws "whitespace" = [ \t\n\r]*

// ----- 3. Values -----

value
  = false
  / null
  / true
  / object
  / array
  / number
  / string

false = "false" { return false; }
null  = "null"  { return null;  }
true  = "true"  { return true;  }

// ----- 4. Objects -----

object
  = begin_object
    members:(
      head:member
      tail:(value_separator m:member { return m; })*
      {
        var result = {};
        [head].concat(tail).forEach(function(element) {
          result[element.name] = element.value;
        });
        return result;
      }
    )?
    end_object
    { return members !== null ? members: {}; }

member
  = name:string name_separator value:value {
      return { name: name, value: value };
    }

// ----- 5. Arrays -----

array
  = begin_array
    values:(
      head:value
      tail:(value_separator v:value { return v; })*
      { return [head].concat(tail); }
    )?
    end_array
    { return values !== null ? values : []; }

// ----- 6. Numbers -----

number "number"
  = minus? int frac? exp? { return parseFloat(text()); }

decimal_point
  = "."

digit1_9
  = [1-9]

e
  = [eE]

exp
  = e (minus / plus)? DIGIT+

frac
  = decimal_point DIGIT+

int
  = zero / (digit1_9 DIGIT*)

minus
  = "-"

plus
  = "+"

zero
  = "0"

// ----- 7. Strings -----

string "string"
  = quotation_mark chars:char* quotation_mark { return chars.join(""); }

char
  = unescaped
  / escape
    sequence:(
        '"'
      / "\\"
      / "/"
      / "b" { return "\b"; }
      / "f" { return "\f"; }
      / "n" { return "\n"; }
      / "r" { return "\r"; }
      / "t" { return "\t"; }
      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {
          return String.fromCharCode(parseInt(digits, 16));
        }
    )
    { return sequence; }

escape
  = "\\"
  
quotation_mark
  = '"' /
  "'" 
unescaped
  = [^\0-\x1F\x22\x5C]

// ----- Core ABNF Rules -----

// See RFC 4234, Appendix B (http://tools.ietf.org/html/rfc4234).
DIGIT  = [0-9]
HEXDIG = [0-9a-f]i