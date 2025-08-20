import { ReportData } from './types'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export class PDFExportService {
  
  async exportReportToPDF(reportData: ReportData, elementId: string = 'report-content'): Promise<void> {
    try {
      console.log('🔄 Starting PDF export...')
      
      // Get the report element
      const element = document.getElementById(elementId)
      if (!element) {
        throw new Error('Report element not found')
      }
      
      // Show loading state
      const originalText = this.showLoadingState()
      
      // Configure html2canvas options for better quality
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200, // Fixed width for consistent rendering
        width: 1200,
        height: element.scrollHeight
      })
      
      // Calculate PDF dimensions
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      let position = 0
      
      // Add first page
      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      // Generate filename with date
      const date = new Date().toISOString().split('T')[0]
      const filename = `business-analysis-report-${date}.pdf`
      
      // Save the PDF
      pdf.save(filename)
      
      // Restore original state
      this.hideLoadingState(originalText)
      
      console.log('✅ PDF exported successfully:', filename)
    } catch (error) {
      console.error('❌ Error exporting PDF:', error)
      this.hideLoadingState('')
      throw new Error('Failed to export PDF. Please try again.')
    }
  }
  
  async exportSectionToPDF(sectionElement: HTMLElement, sectionName: string): Promise<void> {
    try {
      console.log(`🔄 Exporting ${sectionName} to PDF...`)
      
      const canvas = await html2canvas(sectionElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })
      
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgData = canvas.toDataURL('image/png')
      
      // Add title
      pdf.setFontSize(16)
      pdf.text(sectionName, 10, 10)
      
      // Add image
      pdf.addImage(imgData, 'PNG', 0, 20, imgWidth, imgHeight)
      
      // Save
      const date = new Date().toISOString().split('T')[0]
      const filename = `${sectionName.toLowerCase().replace(/\s+/g, '-')}-${date}.pdf`
      pdf.save(filename)
      
      console.log('✅ Section PDF exported successfully:', filename)
    } catch (error) {
      console.error(`❌ Error exporting ${sectionName} to PDF:`, error)
      throw new Error(`Failed to export ${sectionName} to PDF`)
    }
  }
  
  private showLoadingState(): string {
    const exportButton = document.querySelector('[data-export-button]') as HTMLButtonElement
    if (exportButton) {
      const originalText = exportButton.textContent || ''
      exportButton.textContent = 'Generating PDF...'
      exportButton.disabled = true
      return originalText
    }
    return ''
  }
  
  private hideLoadingState(originalText: string): void {
    const exportButton = document.querySelector('[data-export-button]') as HTMLButtonElement
    if (exportButton) {
      exportButton.textContent = originalText || 'Export PDF'
      exportButton.disabled = false
    }
  }
  
  // Alternative method using browser print
  printReport(): void {
    window.print()
  }
  
  // Generate a simple text version for accessibility
  generateTextReport(reportData: ReportData): string {
    const sections = []
    
    sections.push('BUSINESS ANALYSIS REPORT')
    sections.push('=' .repeat(50))
    sections.push('')
    
    // Executive Summary
    sections.push('EXECUTIVE SUMMARY')
    sections.push('-'.repeat(30))
    sections.push(`Industry: ${reportData.businessProfile.industry}`)
    sections.push(`Business Type: ${reportData.businessProfile.businessType}`)
    sections.push(`Team Size: ${reportData.businessProfile.teamSize}`)
    sections.push(`Monthly Revenue: $${reportData.businessProfile.monthlyRevenue.toLocaleString()}`)
    sections.push(`Automation Score: ${reportData.automationScore}/100`)
    sections.push('')
    
    // ROI Projections
    sections.push('ROI PROJECTIONS')
    sections.push('-'.repeat(30))
    sections.push(`First Year Savings: $${reportData.roiProjections.firstYearSavings.toLocaleString()}`)
    sections.push(`Payback Period: ${reportData.roiProjections.timeToPayback.toFixed(1)} months`)
    sections.push(`3-Year Value: $${reportData.roiProjections.threeYearValue.toLocaleString()}`)
    sections.push(`Net ROI: ${reportData.roiProjections.netROI.toFixed(0)}%`)
    sections.push('')
    
    // Opportunities
    sections.push('AUTOMATION OPPORTUNITIES')
    sections.push('-'.repeat(30))
    reportData.opportunities.forEach((opp, index) => {
      sections.push(`${index + 1}. ${opp.title}`)
      sections.push(`   Priority: ${opp.priority}`)
      sections.push(`   Monthly Savings: $${opp.monthlySavings.toLocaleString()}`)
      sections.push(`   Implementation: ${opp.implementationEffort}`)
      sections.push('')
    })
    
    // Strategic Recommendations
    sections.push('STRATEGIC RECOMMENDATIONS')
    sections.push('-'.repeat(30))
    reportData.strategicRecommendations.forEach((rec, index) => {
      sections.push(`${index + 1}. ${rec}`)
    })
    sections.push('')
    
    // Footer
    sections.push('-'.repeat(50))
    sections.push(`Generated: ${new Date(reportData.generatedAt).toLocaleDateString()}`)
    sections.push(`Session ID: ${reportData.sessionId}`)
    
    return sections.join('\n')
  }
  
  // Download text report
  downloadTextReport(reportData: ReportData): void {
    const textContent = this.generateTextReport(reportData)
    const blob = new Blob([textContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `business-analysis-report-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

export const pdfExportService = new PDFExportService()