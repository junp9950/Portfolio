const fs = require('fs');
const path = require('path');

// 데이터 읽기
const projectsData = JSON.parse(fs.readFileSync('data/projects.json', 'utf8'));
const template = fs.readFileSync('templates/index.html', 'utf8');

// 프로젝트 HTML 생성
function generateProjectsHTML(projects) {
    return projects.map(project => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank">GitHub</a>
                <a href="${project.demo}" target="_blank">데모</a>
            </div>
            <div class="project-status">상태: ${project.status}</div>
        </div>
    `).join('');
}

// 스킬 HTML 생성
function generateSkillsHTML(skills) {
    return skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
}

// 연락처 HTML 생성
function generateContactHTML(contact) {
    return `
        <a href="mailto:${contact.email}">이메일</a>
        <a href="${contact.github}" target="_blank">GitHub</a>
        <a href="${contact.linkedin}" target="_blank">LinkedIn</a>
    `;
}

// 템플릿 변수 교체
let html = template
    .replace('{{name}}', '홍길동') // 여기에 본인 이름 입력
    .replace('{{updateDate}}', new Date().toLocaleDateString('ko-KR'))
    .replace('{{projectCount}}', projectsData.projects.length)
    .replace('{{projects}}', generateProjectsHTML(projectsData.projects))
    .replace('{{skills}}', generateSkillsHTML(projectsData.skills))
    .replace('{{contact}}', generateContactHTML(projectsData.contact));

// 최종 HTML 파일 생성
fs.writeFileSync('src/index.html', html);
console.log('✅ 포트폴리오가 성공적으로 생성되었습니다!');
